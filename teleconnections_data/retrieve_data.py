from collections import defaultdict
from datetime import datetime
from enum import Enum
from itertools import groupby
from json import dump
from statistics import mean, stdev

from requests import get


# Contains name of the teleconnection and the corresponding file to write to
class TeleconnectionTypes(Enum):
    NAO = "teleconnections_data/nao_values.json"
    AO = "teleconnections_data/ao_values.json"
    EPO = "teleconnections_data/epo_values.json"
    PNA = "teleconnections_data/pna_values.json"


# Contains the links to retrieve data from for each respective teleconnection
LINKS = {
    TeleconnectionTypes.NAO: "https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/norm.nao.monthly.b5001.current.ascii",
    TeleconnectionTypes.AO: "https://www.cpc.ncep.noaa.gov/products/precip/CWlink/daily_ao_index/monthly.ao.index.b50.current.ascii",
    TeleconnectionTypes.PNA: "https://www.cpc.ncep.noaa.gov/products/precip/CWlink/pna/norm.pna.monthly.b5001.current.ascii",
    TeleconnectionTypes.EPO: "https://downloads.psl.noaa.gov/Public/map/teleconnections/epo.reanalysis.t10trunc.1948-present.txt"
}
# Contains the upper and lower bounds of the time period
_current_date = datetime.today()
bounds = (1950, _current_date.year if _current_date.month > 6 else _current_date.year - 1)


def retrieve_teleconnections_data(teleconnection: TeleconnectionTypes) -> dict[str, list[float]]:
    link = LINKS[teleconnection]

    if teleconnection == TeleconnectionTypes.EPO:
        epo_values = [line.split() for line in get(link).text.strip().split("\n")]

        # Convert raw height anomalies to the z-score (in sigma)
        height_dataset = [float(daily_info[-1]) for daily_info in epo_values]
        mean_of_dataset = mean(height_dataset)
        std_of_dataset = stdev(height_dataset)

        epo_values: list[list[str | float]] = [
            daily_info[:-1] + [(float(daily_info[-1]) - mean_of_dataset) / std_of_dataset]
            for daily_info in epo_values]

        # Retrieve averaged out monthly values
        grouped_by_year_and_month = groupby(epo_values, lambda timeseries: timeseries[:2])
        raw_monthly_values = defaultdict(list)

        for (year, _), daily_values in grouped_by_year_and_month:
            if bounds[0] <= int(year) <= bounds[1]:
                raw_monthly_values[year].append(mean(float(daily_info[-1]) for daily_info in daily_values))

        return raw_monthly_values
    else:
        teleconnections_values = [line.split() for line in get(link).text.strip().split("\n")]
        grouped_by_year = groupby(teleconnections_values, lambda timeseries: timeseries[0])

        return {
            year: [float(monthly_values[-1]) for monthly_values in group]
            for year, group in grouped_by_year
            if bounds[0] <= int(year) <= bounds[1]
        }


if __name__ == '__main__':
    for teleconnection in TeleconnectionTypes:
        with open(teleconnection.value, "w") as file:
            dump(retrieve_teleconnections_data(teleconnection), file, indent=2)
