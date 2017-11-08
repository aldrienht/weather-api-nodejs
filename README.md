# Install Dependencies
	*	cd to app_dir
	*	npm install

# Run Application Locally
	*	cd to app_dir
  * node weather_api.js 

# Open in browser
	* http://localhost:3000/api/weather?zipcode=94040 (change zipcode parameter as you wish)

# Curl Request
	* Step 1: Make sure you're running `node weather_api.js` in terminal
	* Step 2: Open new terminal or tab, then:
		>> curl -i -X GET http://localhost:3000/api/weather?zipcode=94040
		
		# Result:
			HTTP/1.1 200 OK
			content-type: application/json; charset=utf-8
			cache-control: no-cache
			content-length: 111
			vary: accept-encoding
			accept-ranges: bytes
			Date: Wed, 08 Nov 2017 03:56:09 GMT
			Connection: keep-alive

			{"description":"clear sky","temperature":286.15,"humidity":76,"wind_speed":0.87,"name_of_city":"Mountain View"}