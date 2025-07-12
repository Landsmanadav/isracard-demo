# שלב 1: Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# רקורסטור וקבצי פרויקט כדי לנצל caching
COPY *.csproj ./
RUN dotnet restore

# שאר הקוד
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# שלב 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

# העתק את תוצרי ה-publish
COPY --from=build /app/publish ./

# Kestrel יאזין לפורט שה-Render מגדיר ב-${PORT}
ENV ASPNETCORE_URLS=http://*:${PORT}

# (אופציונלי) חשוף את הפורט – לצורך תיעוד בלבד
EXPOSE 80

ENTRYPOINT ["dotnet", "LibraryApi.dll"]
