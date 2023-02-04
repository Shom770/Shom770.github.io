from enum import Enum
from itertools import groupby
from json import dump
from operator import itemgetter

from requests import get


# Contains name of the teleconnection and the corresponding file to write to
class TeleconnectionType(Enum):
    NAO = "nao_values.json"
    AO = "ao_values.json"
    EPO = "epo_values.json"
    PNA = "pna_values.json"


def retrieve_teleconnections_data(teleconnection: TeleconnectionType) -> dict[str, list[float]]:
    if teleconnection == TeleconnectionType.AO:
        ao_values = [line.split() for line in get(
            "https://www.cpc.ncep.noaa.gov/products/precip/CWlink/daily_ao_index/monthly.ao.index.b50.current.ascii"
        ).text.strip().split("\n")]
        grouped_by_year = groupby(ao_values, itemgetter(0))

        return {
            year: [float(monthly_values[-1]) for monthly_values in group]
            for year, group in grouped_by_year
        }


if __name__ == '__main__':
    with open(TeleconnectionType.AO.value, "w") as file:
        dump(retrieve_teleconnections_data(TeleconnectionType.AO), file, indent=2)
