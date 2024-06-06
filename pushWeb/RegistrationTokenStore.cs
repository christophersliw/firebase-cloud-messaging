namespace pushWeb;

public class RegistrationTokenStore
{
    private List<string> _tokens = new List<string>();
    
    public void AddToken(string token)
    {
        if (!_tokens.Contains(token))
        {
            _tokens.Add(token);
        }
    }
    
    public IList<string> GetTokens()
    {
        return _tokens;
    }
}