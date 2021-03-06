export default class DataAccess {
    constructor() {
        this._ipUrl = "https://ipapi.co/json/";
        this._coordinateUrl = "https://weatherusing-thirdparty.kirankumardash1.repl.co/forecast/cord";
    }

    get ipUrl() {
        return this._ipUrl;
    }

    get weatherUrl() {
        return this._weatherUrl;
    }

    set weatherUrl(place) {
        this._weatherUrl = `https://weatherusing-thirdparty.kirankumardash1.repl.co/forecast/city/${place}?units=si`;
    }

    get placeUrl() {
        return this._placeUrl;
    }

    set placeUrl(place) {
        this._placeUrl = `https://weatherusing-thirdparty.kirankumardash1.repl.co/place/${place}`;
    }

    get coordinateUrl() {
        return this._coordinateUrl;
    }

    async GetCurrentPlace() {
        try {
            let response = await fetch(this.ipUrl);
            if (response.ok) {
                let jsonResponse = response.json();
                return jsonResponse;
            }
            throw new Error("Request failed");
        }
        catch (error) {
            return error;
        }
    }

    async GetWeatherByPlace(place) {
        try {
            this.weatherUrl = place;
            let url = this.weatherUrl;
            let response = await fetch(url, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            });
            if (response.ok) {
                return response.json();
            }
            throw Error("Request Failed");
        }
        catch (error) {
            return error;
        }
    }

    async GetPlaceList(placeKeyword) {
        try {
            if (placeKeyword !== "") {
                this.placeUrl = placeKeyword;
                let url = this.placeUrl;
                let response = await fetch(url, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                });
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Request Failed");
            }
            return [];
        }
        catch (error) {
            return error;
        }
    }

    async GetPlaceByCoordinates(coordinates) {
        try {
            let url = this.coordinateUrl;
            let response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(coordinates)
            });
            if (response.ok) {
                return response.json();
            }
            throw new Error("Request Failed");
        }
        catch (error) {
            return error;
        }
    }

}
