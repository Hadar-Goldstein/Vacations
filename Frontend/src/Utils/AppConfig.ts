class AppConfig {
	public readonly vacationsUrl = "http://localhost:4000/api/vacations/"; 
	public readonly activeVacationsUrl = "http://localhost:4000/api/vacations-active/"; 
	public readonly futureVacationsUrl = "http://localhost:4000/api/vacations-future"; 
	public readonly registerUrl = "http://localhost:4000/api/register/"; 
	public readonly loginUrl = "http://localhost:4000/api/login/"; 
	public readonly likesUrl = "http://localhost:4000/api/likes/"; 
	public readonly imagesUrl = "http://localhost:4000/api/images/"; 
	public readonly randomImagesUrl = "http://localhost:4000/api/vacations/random-images"; 
    public readonly emailValidation = "http://localhost:4000/api/email-validation/";
}

export const appConfig = new AppConfig();
