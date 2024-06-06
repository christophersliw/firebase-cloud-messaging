using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace pushWeb.Controllers;

[ApiController]
[Route("firebase-cloud-msg")]
public class FirebaseCloadMsgController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly RegistrationTokenStore _registrationTokenStore;
    private readonly FCMClient _fcmClient;

    public FirebaseCloadMsgController(ILogger<WeatherForecastController> logger, RegistrationTokenStore registrationTokenStore, FCMClient fcmClient)
    {
        _logger = logger;
        _registrationTokenStore = registrationTokenStore;
        _fcmClient = fcmClient;
    }
    
    [HttpGet]
    [HttpGet("test")]
    [EnableCors("AllowAnyOrigin")]
    public async Task<IActionResult> Test()
    {
        return Ok("test - ok");
    }
    
    [HttpPost]
    [Route("register-token")]
    [EnableCors("AllowAnyOrigin")]
    public async Task<IActionResult> RegisterToken([FromBody]RegisterTokenRequest token)
    {
        _registrationTokenStore.AddToken(token.Token);
        
        _logger.LogInformation($"Token registered:{token}");
        
        return Ok(new {success = "ok", message = "token registered"});
    }
    
    [HttpGet]
    [Route("send")]
    [EnableCors("AllowAnyOrigin")]
    public async Task<IActionResult> Send()
    {
        var tokens = _registrationTokenStore.GetTokens();
        _logger.LogInformation("start sending message to tokens");
        
        await _fcmClient.SendMessageAsync("Hello World", 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
            " Praesent tincidunt felis ac ex fermentum tristique. Vivamus " +
            "auctor volutpat tellus, sit amet mollis ligula rutrum nec. ", tokens);
        
        _logger.LogInformation("end sending message to tokens");

        return Ok(new {staus = "ok"});
    }

}