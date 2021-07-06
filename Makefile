ZRedirect.zip: *.json *.js img/* *.md *.txt
	zip -r ZRedirect.zip * -x .git/* -x img/screenshot.png -x .gitignore -x Makefile

clean:
	rm *.zip
