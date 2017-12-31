**Preliminary README pending completion of a more substantial version**

## Electron Application for Financial Advisors

- Includes:
    - uploading tickers and related technical attributes 
    - searching the uploaded data via uploaded attributes
    - saving searches to easily recall prior results
    - uploading of portfolios

### Building

- Get files
    - git clone or download and extract zip 
- Install required packages 
    - npm install
- Rebuild sqlite for desired architecture
    - npm run rebuild
- Build Bundle
    - npm run build:electron
- Start
    - npm run start:electron
    
### Technologies
-   Uses Akveo Blur for design and layout.
-   Election and Angular for UI
-   Sqlite with Sequelize for data storage and retrieval. 
