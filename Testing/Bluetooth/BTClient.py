import socket
import time

message = '{"test":"True"}'

client = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket. BTPROTO_RFCOMM)
client.connect(("20:1e:88:18:14:ff", 4))

time.sleep(2)

try:
    client.send(message.encode("utf-8"))
    print("Sent Data")
    while True:
        data = client.recv(1024)
        if data.decode() == "Data Received":
            print("Data Confirmed")
            break
except OSError as e:
    pass

client.close()