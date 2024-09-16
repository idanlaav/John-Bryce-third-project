class Config {
    public registerUrl = "";
    public loginUrl = "";
    public vacationUrl = "";
    public followingUsersUrl = "";
    public vacationImagesUrl = "";
    public userUrl = "";
}

class DevelopmentConfig extends Config {
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public vacationUrl = "http://localhost:3001/api/vacations/";
    public followingUsersUrl = "http://localhost:3001/api/following-users/";
    public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
    public userUrl = "http://localhost:3001/api/users/";
}

class ProductionConfig extends Config {
    public registerUrl = "https://vacations-update-idan-laav.herokuapp.com/api/auth/register/";
    public loginUrl = "https://vacations-update-idan-laav.herokuapp.com/api/auth/login/";
    public vacationUrl = "https://vacations-update-idan-laav.herokuapp.com/api/vacations/";
    public followingUsersUrl = "https://vacations-update-idan-laav.herokuapp.com/api/following-users/";
    public vacationImagesUrl = "https://vacations-update-idan-laav.herokuapp.com/api/vacations/images/";
    public userUrl = "hhttps://vacations-update-idan-laav.herokuapp.com/api/users/";
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();


export default config;