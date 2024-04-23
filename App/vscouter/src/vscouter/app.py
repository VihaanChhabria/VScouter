"""
A scouting application for FRC made by Vihaan Chhabria.
"""
import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW


class VScouter(toga.App):

    def startup(self):
        """Construct and show the Toga application.

        Usually, you would add your application to a main content box.
        We then create a main window (with a name matching the app), and
        show the main window.
        """
        #matchScoutingBox = toga.Box(style=Pack(direction=COLUMN))
        #pitScoutingBox = toga.Box()

        displayBox = self.WindowGenerators.generateMainWin(self)
        
        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = displayBox
        self.main_window.show()
    
    class WindowGenerators():
        def generateMainWin(self):
            mainBox = toga.Box(style=Pack(direction=COLUMN))

            mainBox.add(
                toga.Button(
                    "Match Scout", 
                    on_press=self.change_window("MatchScout"), 
                    style=Pack(padding=5)))
            
            
            mainBox.add(
                toga.Button(
                    "Pit Scout", 
                    on_press=self.change_window("PitScout"), 
                    style=Pack(padding=5)))

            return mainBox
        
        def generateMatchScoutWin(self):
            matchScoutBox = toga.Box(style=Pack(direction=COLUMN))

            matchScoutBox.add(
                toga.Button(
                    "Return", 
                    on_press=self.change_window("Main"), 
                    style=Pack(padding=5)))
            
        def generatePitScoutWin(self):
            matchScoutBox = toga.Box(style=Pack(direction=COLUMN))

            matchScoutBox.add(
                toga.Button(
                    "Return", 
                    on_press=self.change_window("Main"), 
                    style=Pack(padding=5)))

    def change_window(self, name):
        def on_press(widget):
            if name == "MatchScout":
                displayBox = self.WindowGenerators.generateMatchScoutWin(self)
            elif name == "PitScout":
                displayBox = self.WindowGenerators.generatePitScoutWin(self)
            else:
                displayBox = self.WindowGenerators.generateMainWin(self)

            self.main_window = toga.MainWindow(title=self.formal_name)
            self.main_window.content = displayBox
            self.main_window.show()
            
        return on_press


def main():
    return VScouter()