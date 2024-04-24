"""
A scouting application for FRC made by Vihaan Chhabria.
"""
import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW


class VScouter(toga.App):

    def startup(self):
        """
        Construct and show the Toga application.

        Usually, you would add your application to a main content box.
        We then create a main window (with a name matching the app), and
        show the main window.
        """
        self.main_box = toga.Box(style=Pack(direction=COLUMN))
        self.view_box = toga.Box()
        
        ###
        # Main Screen
        first_view = toga.Button('First View', on_press=self.first_view, style=Pack(padding=2))
        second_view = toga.Button('Second View', on_press=self.second_view, style=Pack(padding=2))

        self.view_box.style = Pack(direction=ROW, padding=2)
        self.view_box.add(first_view)
        self.view_box.add(second_view)
        ###
        
        self.main_box.add(self.view_box)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = self.main_box
        self.main_window.show()

    class WindowGenerators():

        def generateMainWin(self, widget):
            self.main_box.remove(self.view_box)

            self.view_box = toga.Box()
            self.view_box.style = Pack(direction=ROW, padding=2)
            
            #screen_text = toga.Label('This screen will allow you to see your First View')
            #self.view_box.add(screen_text)
            
            self.main_box.add(self.view_box)
            self.main_window.show()


        def generateMatchScoutWin(self, widget):
            self.main_box.remove(self.view_box)

            self.view_box = toga.Box()
            self.view_box.style = Pack(direction=ROW, padding=2)
            
            #screen_text = toga.Label('This screen will allow you to see your First View')
            #self.view_box.add(screen_text)
            
            self.main_box.add(self.view_box)
            self.main_window.show()

        def generatePitScoutWin(self, widget):
            self.main_box.remove(self.view_box)

            self.view_box = toga.Box()
            self.view_box.style = Pack(direction=ROW, padding=2)

            #screen_text = toga.Label('This screen will allow you to see your Second View')
            #self.view_box.add(screen_text)

            self.main_box.add(self.view_box)
            self.main_window.show()


def main():
    return VScouter()