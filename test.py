class data:
    data1p1 = {
        "id": 1,
        "part": 1,
        "data": {
            "test1": 1,
            "test2": 2,
        },
    }
    data1p2 = {
        "id": 1,
        "part": 2,
        "data": {
            "test3": 3,
            "test4": 4,
        },
    }

    data2p1 = {
        "id": 2,
        "part": 1,
        "data": {
            "2test1": 1,
            "2test2": 2,
        },
    }
    data2p2 = {
        "id": 2,
        "part": 2,
        "data": {
            "2test3": 3,
            "2test4": 4,
        },
    }


finalData = {}


def receiveData(newData):
    if newData["id"] in finalData:
        finalData[newData["id"]].update(
            {
                len(finalData[newData["id"]]): {
                    "part": newData["part"],
                    "data": newData["data"],
                }
            }
        )
        return

    finalData.update({newData["id"]: {0: newData["data"]}})


receiveData(data.data1p1)
receiveData(data.data1p2)
receiveData(data.data2p1)
receiveData(data.data2p2)

print(finalData)
# {
#     1: {0: {"test1": 1, "test2": 2}, 1: {"part": 2, "data": {"test3": 3, "test4": 4}}},
#     2: {
#         0: {"2test1": 1, "2test2": 2},
#         1: {"part": 2, "data": {"2test3": 3, "2test4": 4}},
#     },
# }
