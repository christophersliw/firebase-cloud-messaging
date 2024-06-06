using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using pushWeb;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


//https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-8.0
string corsPolicyName = "AllowAnyOrigin";

 builder.Services.AddCors(options =>
 {
     options.AddPolicy(name: corsPolicyName,
         policy  =>
         {
             policy.AllowAnyOrigin()
                 .AllowAnyHeader()
                 .AllowAnyMethod();
         });
 });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<RegistrationTokenStore>();
builder.Services.AddSingleton<FCMClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Commented out for simplicity; ensure HTTPS is configured correctly if used
//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(); 

app.UseAuthorization();

app.MapControllers();

app.Run();