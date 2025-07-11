using LibraryApi.Data;
using LibraryApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 1. רישום המוקטדטאבייס והשירותים
builder.Services.AddSingleton<MockDatabase>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IMemberService, MemberService>();

// 2. הוספת MVC Controllers
builder.Services.AddControllers();

// 3. Swagger (אופציונלי)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// (אם צריך CORS למפתחים)
// app.UseCors("AllowReactApp");

app.UseAuthorization();

// 4. מיפוי כל Controllers
app.MapControllers();

app.Run();
