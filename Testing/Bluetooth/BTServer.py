import socket
import keyboard
import threading
import os

def startServer():
    server = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
    server.bind(("20:1e:88:18:14:ff", 4))
    server.listen(1)

    print("Server Started")

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

    def test():
        client.close()
        server.close()

if __name__ == "__main__":
    thread = threading.Thread(target = startServer)
    thread.start()

    while True:
        print("rin")
        if keyboard.is_pressed("alt+`"):
            print("e")
            os._exit(0)