PBP=../
dt:
	rm -f out.*
	rm -f *.json
	node $(PBP)/das/das2json.mjs dtree-to-dt.drawio
	./check-for-span-error.bash  dtree-to-dt.drawio.json
	python3 main.py $(PBP) 'xinterpret.drawio' main  dtree-to-dt.drawio.json | node $(PBP)/kernel/splitoutput.js
	@if [ -f out.✗ ]; then \
	  cat out.✗; \
	else \
	  mv out.dt xinterpret.dt ; \
	fi

install:
	npm install yargs prompt-sync ohm-js @xmldom/xmldom

clean:
	rm -f out.*
	rm -f *.json
	rm -f junk.* temp.*
