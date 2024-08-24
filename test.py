while True:
  if input("width (w) or height (h)? ") == "w":
    print(str(round((float(input("Enter px Unit "))*100)/932, 2))+"vw")
  else:
    print(str(round((float(input("Enter px Unit "))*100)/430, 2))+"vh")
  input()
  for i in range(50):
    print()