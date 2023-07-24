import os
import favicon
import requests

#Image libraries
from PIL import Image
import PIL

class CreateApp:
	def __init__(self, url, title):
		self.url = url; self.title = title
		self.electronApp()

	def electronApp(self):
		self.titleAsID = self.title.replace(" ","_").lower()
		self.titleCom = self.title.replace(" ","").lower()
		self.createFolder(self.titleAsID) # creation of app folder
		self.favicon_path = self.getFavicon(self.url, self.titleAsID) # favicon of URL
		# reading main.js
		self.mainjs = open("scripts/main-en.js", "r", encoding="utf-8")
		self.mainjsContent = self.mainjs.read()
		self.mainjs.close()
		# changing main.js content
		self.mainjsContent = self.mainjsContent.replace("https://www.example.com", self.url)
		self.mainjsContent = self.mainjsContent.replace("Example_Title", self.title)
		self.mainjsContent = self.mainjsContent.replace("favicon_path", "/"+self.favicon_path)
		# reading package.json
		self.packagejson = open("scripts/package.json", "r", encoding="utf-8")
		self.packagejsonContent = self.packagejson.read()
		self.packagejson.close()
		# changing package.json content
		self.packagejsonContent = self.packagejsonContent.replace("exampleProduct", self.title.replace("-", "").lower().replace("ı", "i"))
		self.packagejsonContent = self.packagejsonContent.replace("exampleID", self.titleCom.replace("-", "").lower().replace("ı", "i"))
		self.packagejsonContent = self.packagejsonContent.replace("example", self.titleAsID.replace("-", "").lower().replace("ı", "i"))
		# creation of app
		self.createElectronFiles(self.titleAsID, self.mainjsContent, self.packagejsonContent)
		self.electronInit(self.titleAsID) # create the path of app and initilaze Electron.js
		# make app executable
		self.appToExe(self.titleAsID)
		# done
		print("Done!")
		exit()
		
	def createFolder(self, titleID):	
		os.system("mkdir {}".format(titleID))

	def createElectronFiles(self, titleID, mainjsContent, packagejsonContent):
		# main.js creation
		self.mainjs2 = open(titleID+"/main.js", "w", encoding="utf-8")
		self.mainjs2.write(mainjsContent)
		self.mainjs2.close()
		# package.json creation
		self.packagejson2 = open(titleID+"/package.json", "w", encoding="utf-8")
		self.packagejson2.write(packagejsonContent)
		self.packagejson2.close()

	def electronInit(self, titleID):
		os.chdir(titleID)
		os.system("npm i electron-builder --save-dev")
		os.system("npm i electron")
		os.system("npm start")
	
	def getFavicon(self, url, titleID):
		try:
			self.icons = favicon.get(url)
			self.icon = self.icons[0]
			self.response = requests.get(self.icon.url, stream=True)
			with open('{}/favicon.{}'.format(titleID, self.icon.format), 'wb') as self.image:
				for self.chunk in self.response.iter_content(1024):
					self.image.write(self.chunk)
			self.image = Image.open("{}/favicon.{}".format(titleID, self.icon.format))
			self.image = self.image.resize((256,256))
			self.image.save("{}/favicon.ico".format(titleID))
			return "favicon.{}".format(self.icon.format)
		except:
			return ""

	def appToExe(self, titleID):
		# os.system("electron-packager . {} --platform=win32 --arch=ia32 --icon=./favicon.ico --prune=true --out=release-builds --asar".format(titleID, favicon_format)) #electron-packager
		if (input("Do you want to continue packaging the app (y/n): ") == "y"):
			os.system("npm run pack")