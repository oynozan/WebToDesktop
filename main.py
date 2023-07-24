from tkinter import *
from tkinter import ttk
from processes import CreateApp

"""General Functions"""
def createApp():
	url = urlWidget.get()
	title = titleWidget.get()
	#Creating an Object from process.py
	appCreatingObj = CreateApp(url, title)

"""Window Settings"""
root = Tk()
root.title("WebToDesktop")
root.geometry("400x300")

"""Window Content"""
urlWidget = Entry(root, width=390) #Website URL input
urlWidget.pack(padx=5, pady=3)
urlWidget.insert(0, 'URL:')
titleWidget = Entry(root, width=390) #Website Title
titleWidget.pack(padx=5, pady=3)
titleWidget.insert(0, 'Title:')
creationButton = Button(root, width=390, text="Create Desktop App", command=createApp).pack(padx=5)

root.mainloop()