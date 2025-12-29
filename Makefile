all: PBP-drawio2json-simple

# Dec. 27 - dt transmogrifier from .dt to .frish and .py
ir:
	rm -f out.*
	rm -f *.json
	node pbp/das/das2json.mjs dtree-transmogrifier.drawio
	./check-for-span-error.bash  dtree-transmogrifier.drawio.json
	python3 main.py . 'xinterpret.dt' ir  dtree-transmogrifier.drawio.json | node ./pbp/kernel/splitoutput.js
	@if [ -f out.✗ ]; then \
	  cat out.✗; \
	fi

# Dec. 7 - use drawware 'dtree-transmogrifier.drawio' to produce 0.json and 1.json (first cut, jq optimized)
PBP-drawio2json-simple:
	rm -f out.*
	rm -f *.json
	node pbp/das/das2json.mjs dtree-transmogrifier.drawio
	./check-for-span-error.bash  dtree-transmogrifier.drawio.json
	python3 main.py . 'test.drawio' main  dtree-transmogrifier.drawio.json | node ./pbp/kernel/splitoutput.js
	@if [ -f out.✗ ]; then \
	  cat out.✗; \
	fi

# Dec. 7 - use drawware 'dtree-transmogrifier.drawio' to produce 0.json and 1.json (first cut, jq optimized)
PBP-drawio2json-full:
	rm -f out.*
	rm -f *.json
	node pbp/das/das2json.mjs dtree-transmogrifier.drawio
	./check-for-span-error.bash  dtree-transmogrifier.drawio.json
	python3 main.py . 'xinterpret.drawio' main  dtree-transmogrifier.drawio.json | node ./pbp/kernel/splitoutput.js
	@if [ -f out.✗ ]; then \
	  cat out.✗; \
	fi


# Dec. 6 - shell pipeline instead of drawware
dev-drawio2json:
	./t2t dtree   <test.drawio >test0.json
	./t2t cleanup <test0.json >test1.json
	jq . <test1.json >test2.json
	./process_json_jq.bash <test2.json >test.json

# bottom-up: test.dt->test.frish
dev-dt:
	./t2t2 dt dtfrish <test.dt | node ./pbp/tas/indenter.mjs | awk 'NF'

install:
	npm install yargs prompt-sync ohm-js @xmldom/xmldom

