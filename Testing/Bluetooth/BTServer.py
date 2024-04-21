import socket

server = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
server.bind(("20:1e:88:18:14:ff", 4))
server.listen(1)

client, addr = server.accept()

try:
    while True:
        data = client.recv(1024)
        if data:
            print(f"Message: {data.decode('utf-8')}")
            client.send("Data Received".encode("utf-8"))
            break
        
except OSError as e:
    pass

client.close()
server.close()