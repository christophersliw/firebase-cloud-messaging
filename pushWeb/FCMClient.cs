using System.Text;
using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;

namespace pushWeb;

public class FCMClient
{
    private  async Task<string> GetAccessTokenAsync()
    {
        GoogleCredential credential;
        using (var stream = new FileStream("token.json", FileMode.Open, FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped("https://www.googleapis.com/auth/firebase.messaging");
        }

        var token = await credential.UnderlyingCredential.GetAccessTokenForRequestAsync();
        return token;
    }

    
    public async Task SendMessageAsync(string title, string body, IList<string> registrationTokens)
    {
        string accessToken = await GetAccessTokenAsync();

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

            var message = new
            {
                message = new
                {
                    notification = new
                    {
                        title = title,
                        body = body
                    },
                    token = registrationTokens[0]
                }
            };
            
            Console.WriteLine($"Serialized{JsonConvert.SerializeObject(message)}");

            var content = new StringContent(JsonConvert.SerializeObject(message), Encoding.UTF8, "application/json");
            
            
            HttpResponseMessage response = await client.PostAsync("https://fcm.googleapis.com/v1/projects/web-test-8baab/messages:send", content);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Message sent successfully.");
            }
            else
            {
                Console.WriteLine($"Failed to send message: {response.StatusCode}");
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseBody);
            }
        }
    }
}