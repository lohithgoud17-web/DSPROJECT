/*==========================================================================
  DIGITAL LABORATORY
  ----------------------------------------------------------------------
  THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTENT.
  Every piece of text, link, video and code shown on the website is
  read from this file. Nothing is hard-coded inside the UI.

  HOW TO UPDATE:
    1. STUDENT      -> change photo / name / id / section / faculty / profession
    2. SUBJECT CODE -> change labMeta.subjectCode
    3. EXPERIMENTS   -> edit or append objects in the `experiments` array
    4. SECTIONS     -> the `sections` array of any experiment. Add or remove
                        freely; the website renders however many you define.
    5. VIDEOS       -> drop .mp4 files into assets/videos/ using the exact
                        filenames listed in assets/videos/README.txt
    6. CODE         -> replace the `code` string for any section
    7. MODULES      -> edit the `modules` array (5 buttons above the
                        "Digital Laboratory" heading on the home page).
                        Drop PDFs into assets/modules/ and list them here.
    8. PROJECTS     -> edit the `projects` array to change the cards shown
                        on the Projects showcase page.
    9. TOOLS        -> edit the `tools` array to change the cards shown on
                        the Tools & Technologies page.

  After editing, just refresh the browser. No build step, no server needed.
==========================================================================*/

/* -------------------------------------------------------------------------
   1. LABORATORY BRANDING
   ------------------------------------------------------------------------- */
var laboratory = {
  name: "Digital Laboratory",
  tagline: "Digital Laboratory",
  address: "SREE SAINATH NAGAR, A. RANGAMPETA, TIRUPATI - 517102"
};

var labMeta = {
  subjectCode: "22DS102006",   // Digital Laboratory
  academicYear: "2025 - 2026",
  department: "Department of Computer Science & Engineering",
  copyrightYear: "2026",
  footerNote: "Laboratory records are for academic use."
};

/* -------------------------------------------------------------------------
   2. STUDENT DETAILS  (shown on the ID card, right side of page 1)
   photo accepts a file path OR leave it empty "" to keep the placeholder.
   ------------------------------------------------------------------------- */
var student = {
  "photo": "assets/img/student-photo.jpg",
  "name": "Lohith Goud",
  "idNumber": "24102A030135",
  "section": "CSE-DS-3",
  "faculty": "S. Bosu Babu",
  "profession": "Professor"
};

/* -------------------------------------------------------------------------
   2b. SOCIAL / PROFILE LINKS
   -------------------------------------------------------------------------
   Shown as clickable buttons in the site footer and on the Student Card.
   Leave a URL as "" to hide that button automatically.

   linkedinUrl expects the full profile address, for example
     "https://www.linkedin.com/in/your-handle/"
   ------------------------------------------------------------------------- */
var social = {
  githubUrl: "https://github.com/lohithgoud17-web",
  githubLabel: "lohithgoud17-web",
  linkedinUrl: "https://www.linkedin.com/in/lohith-goud-347608324/",                  // paste the full LinkedIn profile URL here
  linkedinLabel: "Lohith Goud",                // optional, e.g. "Your Name"
  email: "lohithgoud17@gmail.com"                         // optional, e.g. "you@example.com"
};

/* -------------------------------------------------------------------------
   2c. MODULES  (the five buttons shown above the "Digital Laboratory"
   heading on the home page)
   -------------------------------------------------------------------------
   Each button opens a list of PDFs that students can view in a new tab or
   download straight to their device.

     title    label on the button (keep it short - the row wraps on phones)
     subtitle one line shown in the PDF dialog
     pdfs     any number of { title, file } entries; `file` is a path
              relative to index.html, e.g. "assets/modules/module-1.pdf"

   Add, remove or rename PDFs freely - the buttons render however many you
   define. Sample files live in assets/modules/.
   ------------------------------------------------------------------------- */
var modules = [
  {
    "id": 1,
    "title": "Import & Export",
    "subtitle": "CSV, JSON and Excel formats with pandas",
    "pdfs": [
      { "title": "Module 1 - Import and Export Notes", "file": "assets/modules/module-1.pdf" }
    ]
  },
  {
    "id": 2,
    "title": "Web Data & SQL",
    "subtitle": "REST APIs and SQLite databases",
    "pdfs": [
      { "title": "Module 2 - Web Data, APIs and SQL Notes", "file": "assets/modules/module-2.pdf" }
    ]
  },
  {
    "id": 3,
    "title": "Cleaning & Regex",
    "subtitle": "Missing values, encoding, outliers and regular expressions",
    "pdfs": [
      { "title": "Module 3 - Data Cleaning and Regex Notes", "file": "assets/modules/module-3.pdf" }
    ]
  },
  {
    "id": 4,
    "title": "Reshaping Data",
    "subtitle": "MultiIndex, stack/unstack and combining DataFrames",
    "pdfs": [
      { "title": "Module 4 - MultiIndex and Reshaping Notes", "file": "assets/modules/module-4.pdf" }
    ]
  },
  {
    "id": 5,
    "title": "Visualization",
    "subtitle": "Matplotlib and Seaborn plotting suite",
    "pdfs": [
      { "title": "Module 5 - Data Visualization Notes", "file": "assets/modules/module-5.pdf" }
    ]
  }
];

/* -------------------------------------------------------------------------
   3. EXPERIMENTS
   -------------------------------------------------------------------------
   Each experiment supports:
     id             unique number shown as "Experiment <id>"
     name           title used by search and across every page
     tagline        one-line description shown on the preview card
     previewVideo   10 second hover preview, played on mouse-over
     youtubeVideo   YouTube ID (e.g. "dQw4w9WgXcQ") or a full URL
     youtubeLink    full watch URL, shown as a clickable link
     githubLink     repository URL, shown as a clickable link
     summary        the "Summary of Experiment" paragraph
     sections       A / B / C ... any number of parts, any letters

   Each section supports:
     id          short url-safe key used in the address bar
     letter      the label shown in the UI ("A", "B", "B(i)" ...)
     title       short descriptive title
     video       path to that part's screen-recording
     code        the source code, shown with line numbers and highlighting
     outputImage optional image of the plotted output, shown under the video
   ------------------------------------------------------------------------- */

var experiments = [
  {
    "id": 1,
    "name": "Import and Export in CSV, JSON and Excel Formats",
    "tagline": "Creating a DataFrame and persisting it to CSV, JSON and Excel with pandas.",
    "previewVideo": "assets/videos/exp1-preview.mp4",
    "githubLink": "",
    "summary": "This experiment demonstrates how tabular data is created in Python and persisted back out again using pandas. A Student DataFrame is built from a Python dictionary and inspected with `print()`, `head()` and `shape` to confirm its structure and row count. The same DataFrame is then written three different ways. It is exported to a CSV file with `to_csv()` and read back with `read_csv()` to confirm the round trip preserved the data. Next it is written to a JSON file using `to_json()` with record orientation and pretty indentation, and verified with `read_json()`. Finally it is saved as an Excel workbook with `to_excel()` using a named sheet, and reloaded with `read_excel()`. The practical outcome is an understanding of which pandas function to use for each of the three most common flat-file formats, and how the `orient`, `index` and `sheet_name` arguments change the stored result.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Creating a DataFrame and writing it to CSV",
        "video": "assets/videos/exp1-a.mp4",
        "code": "import pandas as pd\n\nstudents={\n    \"Name\":[\"kanishka\",\"surya\",\"shiva\"],\n    \"Roll_no\":[120,110,74],\n    \"Dept\":[\"DS\",\"AIML\",\"CSE\"]\n}\ndf=pd.DataFrame(students)\nprint(df)\nprint(\"\\n\")\nprint(df.head(2))\nprint(\"\\n\")\nprint(df.shape)\n\ndf.to_csv(\"StudentOutputs.csv\",index=False)\nprint(\"CSV file created\")\n\ndf2 = pd.read_csv(\"StudentOutputs.csv\")\nprint(df2)",
        "notes": "WHAT THIS DOES\nBuilds a DataFrame from a Python dict of three\nstudents, inspects it, saves it as CSV, then reads\nthe CSV back to prove the round trip works.\n\nKEY POINTS\n- pd.DataFrame(dict) turns column lists into a table\n- print(df) shows every row; head(2) shows the first 2\n- df.shape returns (rows, columns) -> (3, 3)\n- to_csv(..., index=False) leaves out the row numbers\n- read_csv parses the text file back into a DataFrame\n\nWATCH OUT\n- index=False matters: without it each read/write\n  cycle grows an unnamed first column\n- df2 is a NEW DataFrame, not the same object as df",
        "outputImage": ""
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Exporting and reading a JSON file",
        "video": "assets/videos/exp1-b.mp4",
        "code": "df2.to_json(\n    \"Student.json\",\n    orient=\"records\",\n    indent=4\n)\nprint(\"JSON file created\")\n\ndf3=pd.read_json(\"Student.json\")\nprint(df3)",
        "notes": "WHAT THIS DOES\nWrites the DataFrame from part A to JSON, reads it\nback, and shows the two orientations you will meet.\n\nKEY POINTS\n- orient='records' -> one JSON object per row\n- orient='columns' would nest the data by column\n- indent=4 makes the saved file readable to humans\n- read_json recovers the column names on the way back\n- this part reuses df2, so part A must run first\n\nWATCH OUT\n- JSON keeps the index unless you use orient='table'\n- to_json writes no type tags, so a column of ids can\n  come back as text rather than numbers\n- Sections run in order: A creates df2, B needs it",
        "outputImage": ""
      },
      {
        "id": "c",
        "letter": "C",
        "title": "Exporting and reading an Excel workbook",
        "youtubeVideo": "",
        "video": "assets/videos/exp1-c.mp4",
        "code": "df3.to_excel(\n    \"Student.xlsx\",\n    sheet_name=\"Student Details\",\n    index=False\n)\nprint(\"Excel file created\")\n\ndf4 = pd.read_excel(\n    \"Student.xlsx\",\n    sheet_name=\"Student Details\"\n)\nprint(df4)",
        "notes": "WHAT THIS DOES\nSaves the DataFrame from part B as a real .xlsx\nworkbook and reads it back from a named sheet.\n\nKEY POINTS\n- sheet_name='Student Details' names the worksheet tab\n- read_excel needs the same sheet_name to find it\n- index=False keeps row numbers out of the sheet\n- an xlsx file is a zip archive of XML, not plain text\n\nWATCH OUT\n- xlsx needs a real engine behind it. This lab\n  supplies one in the browser - see the README for the\n  exact limits\n- Sections run in order: B creates df3, C needs it",
        "outputImage": ""
      }
    ]
  },
  {
    "id": 2,
    "name": "Web Data, APIs and SQL Integration",
    "tagline": "Pulling live data from a REST API and working with a SQLite database.",
    "previewVideo": "assets/videos/exp2-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment covers the two common ways real data reaches a Data Science workflow. Part A uses the `requests` library to call the public GitHub REST API for the pandas repository, prints the HTTP status code to confirm the request succeeded, and parses the returned JSON payload into a pandas DataFrame so the response can be inspected like any other table. Part B moves to local storage: a SQLite database file is created with `sqlite3.connect()`, a table is defined and populated, rows are inserted, queried with `SELECT` and updated, and the results are finally loaded back into a pandas DataFrame for analysis. Together the two parts show the full path from a remote HTTP response and from a relational database into the pandas DataFrame that the rest of the course works with.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Fetching live data from a REST API using Requests",
        "youtubeVideo": "",
        "video": "assets/videos/exp2-a.mp4",
        "code": "import requests\nimport pandas as pd\n\nurl = \"https://api.github.com/repos/pandas-dev/pandas/issues\"\nresponse=requests.get(url)\nprint(response.status_code)\nprint(response.text)\n\ndata = response.json()\nprint(type(data))\n\ndf = pd.DataFrame(data)\ndf.head()\n\nprint(df[[\"id\",\"url\",\"repository_url\"]].head())\nprint(df.head(5))",
        "notes": "WHAT THIS DOES\nCalls the public GitHub issues API, checks the HTTP\nstatus, then turns the returned JSON into a DataFrame.\n\nKEY POINTS\n- status_code 200 means the request succeeded\n- response.text is the raw body; .json() parses it\n- this endpoint returns a LIST of issue objects\n- pd.DataFrame(list) treats each item as one row\n- df[['id','url']] selects columns by name\n\nWATCH OUT\n- this part needs internet access; offline it fails\n- the API returns only the first page (30 items), so\n  the table is not the whole dataset\n- always check status_code before trusting .json()",
        "outputImage": ""
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Creating and querying a SQLite database from Python",
        "youtubeVideo": "",
        "video": "assets/videos/exp2-b.mp4",
        "code": "import sqlite3\nimport pandas as pd\n\nconn=sqlite3.connect(\"Engineer.db\")\nprint(\"Database connected\")\n\ncurr=conn.cursor()\nprint(\"Cursor created\")\n\ncurr.execute(\"\"\"\nCREATE TABLE IF NOT EXISTS Engineers(\nid INTEGER PRIMARY KEY,\nname TEXT,\ndept TEXT,\nmarks MARKS\n)\n\"\"\")\nprint(\"Table created\")\n\ncurr.execute(\"\"\"\nINSERT INTO Engineers(id,name,dept,marks)\nVALUES(120,'shiva','CSE-DS',58)\n\"\"\")\nconn.commit()\nprint(\"Engineer inserted\")\n\ncurr.execute(\"\"\"\nINSERT INTO Engineers(id, name, dept, marks)\nVALUES(0, 'Bhuvan', 'AIML', 89)\n\"\"\")\n\nconn.commit()\n\nprint(\"Engineer inserted\")\n\ncurr.execute(\"\"\"\nINSERT INTO Engineers(id,name,dept,marks)\nVALUES(1,'surya','CSE',67)\n\"\"\")\nconn.commit()\nprint(\"Engineer inserted\")\n\ncurr.execute(\"SELECT * FROM  Engineers\")\nrows=curr.fetchall()\nprint(rows)\n\ndf=pd.DataFrame(rows,columns=[\"id\", \"name\", \"dept\", \"marks\"])\nprint(df)\n\ncurr.execute(\"\"\"\nUPDATE Engineers\nSET name='Surya'\nwhere id=2\n\"\"\")\nconn.commit()\nprint(\"Updated successfully\")\n\ndf=pd.DataFrame(rows,columns=[\"id\", \"name\", \"dept\", \"marks\"])\nprint(df)\n\ncurr.execute(\"\"\"\nDELETE FROM Engineers\nwhere id=1\n\"\"\")\nconn.commit()\nprint(\"Deleted succsessfully\")\n\ncurr.execute(\"SELECT * FROM Engineers\")\nrows=curr.fetchall()\nprint(rows)\n\ndf=pd.DataFrame(rows,columns=[\"id\", \"name\", \"dept\", \"marks\"])\nprint(df)",
        "notes": "WHAT THIS DOES\nCreates an SQLite database file, inserts three\nengineer rows, reads them back, then updates\nand deletes.\n\nKEY POINTS\n- sqlite3.connect('Engineer.db') creates the file\n- CREATE TABLE IF NOT EXISTS is safe to re-run\n- conn.commit() is required or the changes vanish\n- curr.fetchall() returns a list of tuples\n- pd.DataFrame(rows, columns=[...]) adds headings\n\nWATCH OUT\n- the UPDATE targets id=2, which was never inserted,\n  so it prints success but changes nothing\n- the DataFrame printed after UPDATE reuses the old\n  rows list, so it cannot show the update\n- never build SQL by string-formatting user input;\n  use parameter placeholders to avoid SQL injection",
        "outputImage": ""
      }
    ]
  },
  {
    "id": 3,
    "name": "Data Cleaning, Transformation and Regular Expressions",
    "tagline": "Handling missing values, encoding categories, detecting outliers and extracting text with regex.",
    "previewVideo": "assets/videos/exp3-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment is about cleaning messy real-world data before analysis. Part A handles missing values: a DataFrame containing `NaN` is inspected with `isna()`, `notna()` and `sum()` to count what is missing, then the gaps are filled using `fillna()` and removed using `dropna()`, comparing the effect of each approach. Part B covers categorical encoding, converting string columns such as gender or department into numeric form with `map()` and `replace()` so they can be used by machine-learning models. Part C detects outliers in a small marks dataset using the interquartile range, computing `Q1` and `Q3` and filtering rows that fall outside the `1.5 x IQR` fences. Part D uses regular expressions, applying `re.findall()` to pull phone numbers and email addresses out of free text and `re.sub()` to clean and replace patterns. Each part ends with a short quick-reference table of the functions used.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Finding and handling missing values",
        "youtubeVideo": "",
        "video": "assets/videos/exp3-a.mp4",
        "code": "import numpy as np\nimport pandas as pd\n\ndata={\n    'A':[1, 2, np.nan],\n    'B':[4, np.nan, np.nan]\n}\ndf=pd.DataFrame(data)\nprint(df)\n\nprint(df.isna())\n\ndata_clean=df.dropna()\nprint(data_clean)\n\ndata_filled = df.fillna(0)\nprint(data_filled)\n\nimport numpy as np\nimport pandas as pd\ndata={\n    \"A\":[1,5,np.nan,7,8],\n    \"B\":[9,np.nan,np.nan,4,3]\n}\ndf=pd.DataFrame(data)\nprint(df)\nprint(\"Finding missing values:\")\nprint(df.isna())\nprint(\"Remove missing rows:\")\nprint(df.dropna())\nprint(\"Replace missing values with 0:\")\nprint(df.fillna(0))",
        "notes": "WHAT THIS DOES\nCreates a table with holes in it, then finds and\nhandles those holes in three different ways.\n\nKEY POINTS\n- np.nan means 'not a number'; pandas shows it NaN\n- df.isna() returns True wherever a value is missing\n- dropna() removes any row containing a missing value\n- fillna(0) puts a value in the hole instead\n- a column becomes float dtype once NaN appears\n\nWATCH OUT\n- dropna() is harsh: one missing value deletes the\n  whole row\n- fillna(0) invents data. Prefer the mean or median,\n  or leave it missing, unless 0 is truly meaningful",
        "outputImage": ""
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Data transformation and categorical encoding",
        "youtubeVideo": "",
        "video": "assets/videos/exp3-b.mp4",
        "code": "import pandas as pd\n\ndata={\n    \"Gender\":[\"male\",\"female\",\"female\",\"male\",\"female\",\"male\"]\n}\ndf=pd.DataFrame(data)\nprint(df)\n\ndf[\"Gender\"]=df[\"Gender\"].map({\n    \"male\":1,\n    \"female\":0\n})\nprint(df) # map() or replace\n\ndf[\"Gender\"]=df[\"Gender\"].replace({\n    \"male\":1,\n    \"female\":0\n})\nprint(df)\n\nimport pandas as pd\ndata={\n    \"Gender\":[\"female\",\"male\",\"male\",\"female\",\"male\"]\n}\ndf=pd.DataFrame(data)\nprint(df)\nprint(\"Replace with values:\")\ndf[\"Gender\"]=df[\"Gender\"].map({\n    \"male\":1,\n    \"female\":0\n})\nprint(df)",
        "notes": "WHAT THIS DOES\nTurns a text column into numbers so a model can use\nit, showing map() and replace() side by side.\n\nKEY POINTS\n- map() takes a dict and converts matching values\n- replace() does the same job with different syntax\n- values absent from the dict become NaN with map()\n- the result is int64, which models can consume\n- the order you map values in is the order they mean\n\nWATCH OUT\n- map() and replace() are NOT equivalent - map()\n  silently returns NaN for anything not in the dict\n- this part applies the mapping twice, so the second\n  block re-creates the DataFrame before remapping\n- a 0/1 encoding is a label, not a ranking",
        "outputImage": ""
      },
      {
        "id": "c",
        "letter": "C",
        "title": "Outlier detection using the IQR method",
        "youtubeVideo": "",
        "video": "assets/videos/exp3-c.mp4",
        "code": "import numpy as np\nimport pandas as pd\n\ndata={\n    \"Marks\":[10,32,43,64,23]\n}\ndf=pd.DataFrame(data)\nprint(df)\n\nQ1=df[\"Marks\"].quantile(0.25)\nQ3=df[\"Marks\"].quantile(0.75)\nIDR=Q3-Q1\nprint(IDR)\n\nlower=Q1-1.5*IDR\nupper=Q3+1.5*IDR\nprint(lower)\nprint(upper)\n\noutliers = df[(df[\"Marks\"]>lower) | (df[\"Marks\"]<upper)]\nprint(outliers)\n\nimport pandas as pd\ndata={\n    \"Marks\":[45, 54, 74, 82, 89, 200]\n}\ndf=pd.DataFrame(data)\nprint(df)\nQ1=df[\"Marks\"].quantile(0.25)\nQ3=df[\"Marks\"].quantile(0.75)\nprint(Q1)\nprint(Q3)\nIDR=Q3-Q1\nprint(\"IDR: \",IDR)\nlower=Q1-1.5*IDR\nupper=Q3+1.5*IDR\nprint(\"Lower: \",lower)\nprint(\"Upper: \",upper)\noutliers = df[\n    (df[\"Marks\"] < lower) |\n    (df[\"Marks\"] > upper)\n]\nprint(\"Outliers:\")\nprint(outliers)",
        "notes": "WHAT THIS DOES\nFinds outliers with the interquartile range rule:\nanything outside Q1 - 1.5*IQR to Q3 + 1.5*IQR.\n\nKEY POINTS\n- Q1 and Q3 are the 25th and 75th percentiles\n- IQR = Q3 - Q1, the spread of the middle half\n- the fences sit 1.5 * IQR beyond each quartile\n- a 200 among values ending at 89 is caught as an\n  outlier\n- combine masks with (& ...) or (| ...) to filter\n\nWATCH OUT\n- the first block of this part has the comparison\n  reversed: it keeps values >lower OR <upper, which\n  matches nearly every row. The second block uses the\n  correct  <lower OR >upper  form.\n- the variable is named IDR; the usual name is IQR",
        "outputImage": ""
      },
      {
        "id": "d",
        "letter": "D",
        "title": "Extracting text patterns with regular expressions",
        "youtubeVideo": "",
        "video": "assets/videos/exp3-d.mp4",
        "code": "import re\n\ntext=\"My phone number is 9876543210\"\nprint(text)\n\nphone_number=re.findall(r\"\\d{10}\",text)\nprint(phone_number)\n\ntext=\"My email is anumulakanishka@gmail.com\"\nprint(text)\n\nemail=re.findall(r\"[\\w.-]+@[\\w.-]+\\.\\w+\",text)\nprint(email)\n\ntext= \"Emails are anumulakanishka@gmail.com and 24102A030004@mbu.asia\"\nprint(text)\n\nemails=re.findall(r\"[\\w.-]+@[\\w.-]+\\.\\w+\",text)\nprint(emails)\n\ntext=\"My phone number is 8919952311\"\nSearch=re.search(r\"\\d{10}\",text)\nprint(Search)\nprint()\nprint(Search.group())\n\ntext=\"My phone number is 9876543210\"\nStarting_number=re.match(r\"\\d{10}\",text)\nprint(Starting_number)\n\ntext=\"apple banana mango watermelon\"\nresult=re.split(r\" \",text)\nprint(result)\n\ntext = \"My phone number is 9876543210\"\nresult = re.sub(r\"\\d{10}\", \"XXXXXXXXXX\", text)\nprint(result)\n\nimport re\ntext=\"->My number is 9876543210\"\nprint(text)\nphone=re.findall(r\"\\d{10}\",text)\nprint(phone)\ntext=\"->My email is anumulakanishka@gmail.com\"\nprint(text)\nemail=re.findall(r\"[\\w.-]+@[\\w.-]+\\.\\w+\",text)\nprint(email)\ntext=\"->My emails are anumulakanishka@gmail.com and 24102A030004@mbu.asia\"\nprint(text)\nemails=re.findall(r\"[\\w.-]+@[\\w.-]+\\.\\w+\",text)\nprint(emails)\ntext=\"->My roll number is 120\"\nprint(text)\nSearch=re.search(r\"\\d{3}\",text)\nprint(Search)\nprint(Search.group())\ntext=\"->apple banana mango\"\nprint(text)\nresult=re.split(\" \",text)\nprint(result)\ntext = \"->My phone number is 8919952311\"\nprint(text)\nresult = re.sub(r\"\\d{10}\", \"XXXXXXXXXX\", text)\nprint(result)",
        "notes": "WHAT THIS DOES\nPulls structured values out of raw text: phone\nnumbers, email addresses and roll numbers.\n\nKEY POINTS\n- findall() returns every match as a list\n- search() returns the FIRST match as an object\n- match() is anchored to the start of the string\n- split() breaks text apart on a pattern\n- sub() replaces matches, like global find/replace\n- r'...' raw strings keep backslashes literal\n\nWATCH OUT\n- re.match on 'My phone number is 8919952311' prints\n  None, and correctly so: the digits are not at\n  position 0\n- \\d{10} means exactly ten digits; \\d+ means one or\n  more\n- an unescaped dot (.) matches ANY character",
        "outputImage": ""
      }
    ]
  },
  {
    "id": 4,
    "name": "MultiIndex, Reshaping and Combining DataFrames",
    "tagline": "Hierarchical indexes, stack/unstack reshaping and merging or combining datasets.",
    "previewVideo": "assets/videos/exp4-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment covers the pandas operations used when a dataset is more complex than a flat table. Part A builds a hierarchical index with `set_index()` using two key columns, selects values with `xs()`, and reads a single cross-section with `xs(level=...)`. Part B reshapes data between wide and long layouts with `stack()` and `unstack()`, demonstrating how a column becomes a row index and back again. Part C combines datasets: `pd.merge()` performs a join on a shared key with inner, outer and left variants, and `combine_first()` fills gaps in one frame from another. These three operations are the foundation for anything involving grouped or panel-style data in pandas.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Building and querying a MultiIndex",
        "youtubeVideo": "",
        "video": "assets/videos/exp4-a.mp4",
        "code": "import pandas as pd\n\ndata={\n    \"Name\":[\"shiva\",\"kanishka\",\"surya\",\"kushwanth\"],\n    \"Marks\":[82,92,89,96]\n}\ndf=pd.DataFrame(data)\nprint(df)\n\ndf=pd.DataFrame(\n    {\n       \"Marks\":[82,92,89,96]\n    },\n    index=[\n        [\"CSE-DS\",\"CSE-DS\",\"CSE\",\"CSE-DS\"],\n        [\"shiva\",\"kanishka\",\"surya\",\"kushwanth\"]\n    ]\n)\nprint(df)\n\ndf.index.names = [\"Department\", \"Name\"]\nprint(df)\n\nprint(df.loc[\"CSE-DS\",\"Marks\"])\n\ndf.loc[(\"CSE-DS\", \"shiva\")]\n\nprint(df.loc[\"CSE-DS\"])\n\nprint(df.loc[\"CSE\"])\n\nprint(df[\"Marks\"])\n\ndf=df.reset_index()\nprint(df)\n\n# Important ones:\n# MultiIndex        → Multiple index levels → DataFrame\n# index.names       → Give names to index levels\n# loc[]             → Access data using index labels\n# reset_index()     → Index → normal columns\n\nimport pandas as pd\ndata={\n    \"Name\":[\"Shiva\",\"kanishka\",\"surya\",\"kushwanth\"],\n    \"Marks\":[82,92,89,96]\n}\nprint(df)\ndf=pd.DataFrame(\n    {\n       \"Marks\":[82,92,89,96]\n    },\n    index=[\n        [\"CSE-DS\",\"CSE-DS\",\"CSE\",\"CSE-DS\"],\n        [\"shiva\",\"kanishka\",\"surya\",\"kushwanth\"]\n    ]\n)\nprint(\"Multi index---------------------------:\")\nprint(df)\ndf.index.names=[\"Department\",\"Name\"]\nprint(\"Giving names to index levels----------: \")\nprint(df)\nprint(\"Students Name and marks---------------:\")\nprint(df.loc[\"CSE-DS\",\"Marks\"])\nprint(\"CSE-DS students-----------------------:\")\nprint(df.loc[\"CSE-DS\"])\nprint(\"CSE students--------------------------:\")\nprint(df.loc[\"CSE\"])\nprint(\"Index → normal columns----------------:\")\ndf=df.reset_index()\nprint(df)",
        "notes": "WHAT THIS DOES\nBuilds a two-level row index (Department, Name), names\neach level, then selects rows using .loc.\n\nKEY POINTS\n- index=[[...],[...]] creates two index levels\n- index.names = [...] labels each level\n- df.loc['CSE-DS'] returns that whole group\n- df.loc[('CSE-DS','shiva')] picks one exact row\n- reset_index() turns the index back into columns\n\nQUICK REFERENCE\n- MultiIndex      multiple index levels on a DataFrame\n- index.names     give names to the index levels\n- loc[]           access data using index labels\n- reset_index()   index -> normal columns\n\nWATCH OUT\n- this part rebuilds df from scratch halfway through,\n  which discards the earlier rows on purpose",
        "outputImage": ""
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Reshaping data with stack and unstack",
        "youtubeVideo": "",
        "video": "assets/videos/exp4-b.mp4",
        "code": "import pandas as pd\n\ndata={\n    \"DataScience\":[43,48],\n    \"Iot\":[45,41]\n}\ndf=pd.DataFrame(\n    data,\n    index=[\"shiva\",\"jaisimha\"]\n)\nprint(df)\n\nstacked=df.stack()\nprint(stacked)\n\nprint(df.unstack())\n\nprint(stacked.unstack())",
        "notes": "WHAT THIS DOES\nMoves values between the column axis and the row\naxis, and then back again.\n\nKEY POINTS\n- stack() folds the columns down into the index\n- unstack() spreads the index back out to columns\n- stack() returns a Series with a MultiIndex\n- stacked.unstack() restores the original shape\n- stack() drops NaN by default\n\nWATCH OUT\n- stack and unstack are inverses, but stack returns a\n  Series while unstack returns a DataFrame\n- stacking behaviour changed across pandas versions,\n  so results can differ between releases",
        "outputImage": ""
      },
      {
        "id": "c",
        "letter": "C",
        "title": "Merging and combining DataFrames",
        "youtubeVideo": "",
        "video": "assets/videos/exp4-c.mp4",
        "code": "import pandas as pd\n\ndata={\n    \"ID\":[1,2,3,4],\n    \"Name\":[\"Shiva\",\"Kanishka\",\"surya\",\"kushwanth\"]\n}\ndf1=pd.DataFrame(data)\ndata={\n    \"ID\":[1,2,3,5],\n    \"Marks\":[82,92,87,96]\n}\ndf2=pd.DataFrame(data)\nprint(df1)\nprint(df2)\n\ndf3=df1.merge(df2)\nprint(df3)\n\ndf3 = pd.merge(df1, df2, on=\"ID\", how=\"right\")\nprint(df3)\n\ndf3 = pd.merge(df1, df2, on=\"ID\", how=\"inner\")\nprint(df3)\n\ndf3 = pd.merge(df1, df2, on=\"ID\", how=\"left\")\nprint(df3)\n\ndf3 = pd.merge(df1, df2, on=\"ID\", how=\"outer\")\nprint(df3)\n\nprint(df3[df3[\"Marks\"] > 80])\n\ndf3[\"Marks\"] = df3[\"Marks\"].fillna(0)\nprint(df3)",
        "notes": "WHAT THIS DOES\nJoins two tables on a shared ID column using all four\njoin types, then filters and fills.\n\nKEY POINTS\n- merge() matches on common columns automatically\n- on='ID' names the join key explicitly\n- inner  keeps only IDs present in both tables\n- left   keeps every row of the left table\n- right  keeps every row of the right table\n- outer  keeps everything, padding gaps with NaN\n\nWATCH OUT\n- ID 4 exists only in df1 and ID 5 only in df2, which\n  is exactly what makes the four join types differ\n- left and outer joins introduce NaN, which quietly\n  turns an integer column into float",
        "outputImage": ""
      }
    ]
  },
  {
    "id": 5,
    "name": "Data Visualization with Matplotlib and Seaborn",
    "tagline": "A full plotting suite over the Iris dataset and custom datasets.",
    "authored": true,
    "authoredNote": "Supplied for this site only - there is no Experiment 5 file in the submitted lab record. The other four experiments are converted from the student's own notebooks.",
    "previewVideo": "assets/videos/exp5-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This is the largest and most visual experiment, covering the plotting workflow with Matplotlib and Seaborn. It opens with the Iris dataset loaded directly from a remote CSV, followed by `head()`, `info()` and `describe()` to profile it. Five core chart types are then produced: a Matplotlib line plot of sepal and petal length, a Seaborn scatter plot coloured by species, a histogram with a kernel density overlay, a box plot comparing petal length across species, and a Seaborn pair plot of the full feature matrix. A second figure uses `plt.subplots()` to build a two-row annotated layout of monthly sales and expenses and exports it to PNG at 300 DPI. The remaining sections cover grouped and stacked bar plots built directly from a DataFrame with `df.plot()`, a histogram and filled KDE density plot of marks, a scatter plot of study hours against marks with the Pearson correlation coefficient printed, and a box plot of marks grouped by department.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Exploring the Iris dataset with five plot types",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-a.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n# Load online dataset\nurl = \"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\ndf = pd.read_csv(url)\n# Display first five records\nprint(\"First Five Records:\")\nprint(df.head())\n# Display dataset information\nprint(\"\\nDataset Information:\")\nprint(df.info())\n# Display statistical summary\nprint(\"\\nStatistical Summary:\")\nprint(df.describe())\n# ---------------------------------------------------\n# 1. Matplotlib-Line Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8,5))\nplt.plot(df.index,df[\"sepal_length\"],label=\"Sepal Length\")\nplt.plot(df.index,df[\"petal_length\"],label=\"Petal Length\")\nplt.xlabel(\"Sample Index\")\nplt.ylabel(\"Length\")\nplt.title(\"Sepal Length and Petal Length\")\nplt.legend()\nplt.grid()\nplt.show()\n# ---------------------------------------------------\n# 2. Seaborn-Scatter Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8,5))\nsns.scatterplot(\n    data=df,\n    x=\"sepal_length\",\n    y=\"petal_length\",\n    hue=\"species\"\n)\nplt.title(\"Sepal Length vs Petal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Petal Length\")\nplt.show()\n# ---------------------------------------------------\n# 3. Seaborn-Histogram\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nsns.histplot(\n    data=df,\n    x=\"sepal_length\",\n    hue=\"species\",\n    kde=True\n)\nplt.title(\"Distribution of Sepal Length\")\nplt.xlabel(\"Sepal Length\")\nplt.ylabel(\"Frequency\")\nplt.show()\n# ---------------------------------------------------\n# 4. Seaborn-Box Plot\n# ---------------------------------------------------\nplt.figure(figsize=(8, 5))\nsns.boxplot(\n    data=df,\n    x=\"species\",\n    y=\"petal_length\"\n)\nplt.title(\"Petal Length by Species\")\nplt.xlabel(\"Species\")\nplt.ylabel(\"Petal Length\")\nplt.show()\n# ---------------------------------------------------\n# 5. Seaborn-Pair Plot\n# ---------------------------------------------------\nsns.pairplot(\n    df,\n    hue=\"species\"\n)\nplt.show()",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nLoads the Iris dataset from the web, inspects it with\nhead/info/describe, then draws five plot types.\n\nKEY POINTS\n- read_csv(url) reads straight from a web address\n- info() shows dtypes and counts of missing values\n- describe() gives count/mean/std/min/quartiles/max\n- plot() draws directly from the DataFrame\n- scatterplot/histplot/boxplot/pairplot take data=\n- hue='species' colours the marks by species\n\nWATCH OUT\n- this part needs internet access for the CSV\n- pairplot() draws every numeric pair, so it gets\n  slow on wide dataframes\n- histplot(kde=True) overlays a smoothed density curve"
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Subplots and an annotated multi-panel figure",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-b.mp4",
        "code": "import matplotlib.pyplot as plt\nmonths=[\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\"]\nsales=[120,150,180,160,220,250]\nexpenses=[80,100,120,110,140,160]\nfig,ax=plt.subplots(2,1,figsize=(10,8))\nax[0].plot(months,sales,marker=\"o\",linewidth=2,label=\"Sales\")\nax[0].set_title(\"Monthly Sales\")\nax[0].set_xlabel(\"Month\")\nax[0].set_ylabel(\"Sales\")\nax[0].set_xticks(range(len(months)))\nax[0].set_xticklabels(months)\nax[0].annotate(\"Highest Sales\",xy=(5,250),xytext=(3.5,270),arrowprops=dict(arrowstyle=\"->\"))\nax[0].legend()\nax[0].grid(True)\nax[1].plot(months,expenses,marker=\"s\",linewidth=2,label=\"Expenses\")\nax[1].set_title(\"Monthly Expenses\")\nax[1].set_xlabel(\"Month\")\nax[1].set_ylabel(\"Expenses\")\nax[1].set_xticks(range(len(months)))\nax[1].set_xticklabels(months)\nax[1].annotate(\"Highest Expense\",xy=(5,160),xytext=(3.5,180),arrowprops=dict(arrowstyle=\"->\"))\nax[1].legend()\nax[1].grid(True)\nfig.suptitle(\"Monthly Sales and Expenses Analysis\",fontsize=16)\nplt.tight_layout()\nplt.savefig(\"monthly_sales_expenses.png\",dpi=300,bbox_inches=\"tight\")\nplt.show()",
        "outputImage": "assets/img/monthly-sales-expenses.png",
        "notes": "WHAT THIS DOES\nBuilds two stacked plots on one figure, labels the peak\nof each with an arrow, then saves a PNG.\n\nKEY POINTS\n- plt.subplots(2,1) returns a figure and an axes array\n- ax[0] and ax[1] are the top and bottom plots\n- set_xticks + set_xticklabels name the month axis\n- annotate() puts text at xytext and points at xy\n- suptitle() titles the whole figure, not one plot\n- tight_layout() stops labels being clipped\n- savefig(..., dpi=300) writes a print-quality file\n\nWATCH OUT\n- savefig() in this browser lab writes to the in-page\n  file system; in a normal Python run it writes to disk"
      },
      {
        "id": "bi",
        "letter": "B(i)",
        "title": "Grouped bar plot of student marks",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-bi.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\ndata={\n'Python':[85,90,78,88],\n'Java':[75,82,80,85],\n'C++':[80,76,85,90]\n}\ndf=pd.DataFrame(data,index=['Student1','Student2','Student3','Student4'])\nprint(\"DataFrame:\")\nprint(df)\ndf.plot(kind='bar',figsize=(8,5))\nplt.title(\"Student Marks in Different Programming Languages\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nTurns a DataFrame of student marks into a grouped\n(clustered) bar chart.\n\nKEY POINTS\n- each DataFrame column becomes a bar group\n- the index supplies the x axis labels\n- kind='bar' selects vertical bars\n- legend(title='Subjects') names the colour key\n- tight_layout() keeps long labels inside the figure\n\nWATCH OUT\n- xticks(rotation=0) keeps labels horizontal; drop it\n  if they get crowded\n- this compares subjects per student - swap the axes\n  to compare students per subject instead"
      },
      {
        "id": "bii",
        "letter": "B(ii)",
        "title": "Stacked bar plot of student marks",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-bii.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\ndata={\n'Python':[85,90,78,88],\n'Java':[75,82,80,85],\n'C++':[80,76,85,90]\n}\ndf=pd.DataFrame(data,index=['Student1','Student2','Student3','Student4'])\nprint(\"DataFrame:\")\nprint(df)\ndf.plot(kind='bar',stacked=True,figsize=(8,5))\nplt.title(\"Stacked Bar Plot of Student Marks\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Total Marks\")\nplt.xticks(rotation=0)\nplt.legend(title=\"Subjects\")\nplt.tight_layout()\nplt.show()",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nThe same data as the previous part, but the bars are\nstacked so each student shows one total height.\n\nKEY POINTS\n- stacked=True stacks the columns on each bar\n- the bar height becomes the sum of the subjects\n- useful for part-to-whole comparison\n- unlike grouped bars, one series hides another\n\nWATCH OUT\n- only the bottom segment shares a common baseline,\n  so comparing the upper segments is unreliable\n- use grouped bars when the values must be compared"
      },
      {
        "id": "c",
        "letter": "C",
        "title": "Histogram and kernel density plot",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-c.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata=[45,50,52,55,58,60,62,65,68,70,72,75,78,80,82,85,88,90,92,95]\ndf=pd.DataFrame({'Marks':data})\nprint(\"Observed Data:\")\nprint(df)\nplt.figure(figsize=(8,5))\nsns.histplot(df['Marks'],bins=6,kde=False)\nplt.title(\"Histogram of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Frequency\")\nplt.tight_layout()\nplt.show()\nplt.figure(figsize=(8,5))\nsns.kdeplot(df['Marks'],fill=True)\nplt.title(\"Density Plot of Marks\")\nplt.xlabel(\"Marks\")\nplt.ylabel(\"Density\")\nplt.tight_layout()\nplt.show()",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nPlots the distribution of one column as a histogram,\nthen as a smoothed density curve.\n\nKEY POINTS\n- histplot(x=...) bins a single numeric column\n- bins=6 sets how many bars are drawn\n- kde=True overlays the density estimate\n- kdeplot(fill=True) shades under the curve\n- bars count observations; the curve is smoothed\n\nWATCH OUT\n- the bin count changes the shape you see, so check\n  more than one bin width before concluding anything\n- a density estimate never runs on a column that still\n  holds NaN - drop or fill those first"
      },
      {
        "id": "d",
        "letter": "D",
        "title": "Scatter plot and correlation coefficient",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-d.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nstudy_hours=[1,2,3,4,5,6,7,8,9,10]\nmarks=[45,50,55,60,65,70,72,80,85,90]\ndf=pd.DataFrame({'Study_Hours':study_hours,'Marks':marks})\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8,5))\nplt.scatter(df['Study_Hours'],df['Marks'])\nplt.title(\"Relationship Between Study Hours and Marks\")\nplt.xlabel(\"Study Hours\")\nplt.ylabel(\"Marks\")\nplt.grid(True)\nplt.tight_layout()\nplt.show()\ncorrelation=df['Study_Hours'].corr(df['Marks'])\nprint(\"\\nCorrelation Coefficient:\",round(correlation,2))",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nPlots marks against study hours, then measures how\nstrongly the two move together.\n\nKEY POINTS\n- scatter(x, y) needs one value per point\n- corr() returns Pearson's r, between -1 and 1\n- round(r, 2) trims the printed value to 2 decimals\n- a positive r means both rise together\n- an r near 0 means no linear relationship\n\nWATCH OUT\n- correlation is not causation\n- r only measures LINEAR relationships; a curved\n  pattern can still score near zero\n- this data is almost perfectly linear, so the result\n  sits near 1 - real data rarely behaves so neatly"
      },
      {
        "id": "e",
        "letter": "E",
        "title": "Box plot of marks by department",
        "youtubeVideo": "",
        "video": "assets/videos/exp5-e.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\ndata={\n'Department':['CSE','CSE','CSE','CSE','CSE','ECE','ECE','ECE','ECE','ECE','EEE','EEE','EEE','EEE','EEE'],\n'Marks':[78,85,90,72,88,65,70,82,75,80,60,68,72,76,85]\n}\ndf=pd.DataFrame(data)\nprint(\"Data:\")\nprint(df)\nplt.figure(figsize=(8,5))\nsns.boxplot(x='Department',y='Marks',data=df)\nplt.title(\"Marks Distribution by Department\")\nplt.xlabel(\"Department\")\nplt.ylabel(\"Marks\")\nplt.grid(axis='y',linestyle='--',alpha=0.5)\nplt.tight_layout()\nplt.show()",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nCompares the spread of marks across three departments\nusing a box plot.\n\nKEY POINTS\n- boxplot(x=..., y=..., data=...) groups by x\n- the box spans the middle 50% (Q1 to Q3)\n- the line inside the box is the median\n- whiskers reach the usual 1.5*IQR limits\n- points beyond the whiskers are drawn as outliers\n\nWATCH OUT\n- the box shows neither the mean nor the sample size\n- with only five rows per department the quartiles are\n  rough, so treat the shape as indicative"
      }
    ]
  },
  {
    "id": 6,
    "name": "Time Series, Datetime Indexing and Resampling",
    "tagline": "Working with dates, time zones, periods and resampling in pandas.",
    "previewVideo": "assets/videos/exp6-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment covers the pandas machinery for date and time data. It starts by building a Series whose index is a DatetimeIndex created with pd.to_datetime, and generating date ranges with pd.date_range. It then explores time zones: creating tz-aware ranges for Asia/Kolkata, localizing a naive index with tz_localize, converting between zones with tz_convert (Asia/Kolkata to America/New_York), and combining tz-aware Series with pd.concat. Period objects come next, with pd.Period and pd.period_range demonstrating calendar arithmetic such as adding or subtracting whole months. Periods and a PeriodIndex are then converted to a different frequency using asfreq('D', how='start'/'end'), and whole Series and DataFrames are cast to monthly periods with to_period. The experiment finishes with resampling: downsampling an hourly series to 3-hour means and 4-hour sums, upsampling to 30-minute buckets with asfreq, and filling the resulting gaps with forward fill.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Creating a time series with a DatetimeIndex",
        "video": "assets/videos/exp6-a.mp4",
        "code": "import pandas as pd\r\ndates = pd.to_datetime([\r\n    '2026-01-01',\r\n    '2026-01-02',\r\n    '2026-01-03',\r\n    '2026-01-04',\r\n    '2026-01-05'\r\n])\r\ntemperature = [28, 30, 29, 31, 32]\r\ntime_series = pd.Series(\r\n    temperature,\r\n    index=dates\r\n)\r\nprint(\"Time Series:\")\r\nprint(time_series)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nParses a list of date strings into a DatetimeIndex and\nattaches a temperature value to each date.\n\nKEY POINTS\n- pd.to_datetime() turns strings into real Timestamps\n- pd.Series(values, index=dates) makes a time series\n- the index is what gives the data a time axis\n- a DatetimeIndex unlocks date-based slicing later\n\nWATCH OUT\n- without parsing, the dates are just ordinary text\n- the values list must be the same length as the dates"
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Generating a DatetimeIndex with date_range",
        "video": "assets/videos/exp6-b.mp4",
        "code": "import pandas as pd\r\n\r\ndate_index = pd.date_range(\r\n    start='2026-01-01',\r\n    periods=7,\r\n    freq='D'\r\n)\r\n\r\nprint(\"Generated DatetimeIndex:\")\r\nprint(date_index)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nBuilds an evenly spaced DatetimeIndex instead of typing\nevery date by hand.\n\nKEY POINTS\n- start + periods + freq generate a fixed count of stamps\n- freq 'D' = daily, 'h' = hourly, 'M' = month end\n- the result can index a Series or DataFrame directly\n\nWATCH OUT\n- freq 'M' is month END; use 'MS' for month START\n- periods and end= are alternatives - use one, not both"
      },
      {
        "id": "c",
        "letter": "C",
        "title": "Time zone localization and conversion",
        "video": "assets/videos/exp6-c.mp4",
        "code": "import pandas as pd\r\n\r\nindia_dates = pd.date_range(\r\n    start='2026-01-01 09:00',\r\n    periods=3,\r\n    freq='h',\r\n    tz='Asia/Kolkata'\r\n)\r\n\r\nprint(\"1. Date Range with Asia/Kolkata Time Zone:\")\r\nprint(india_dates)\r\n\r\n\r\ndates = pd.date_range(\r\n    start='2026-01-01 09:00',\r\n    periods=3,\r\n    freq='h'\r\n)\r\n\r\nprint(\"\\n2. Timezone-naive Date Range:\")\r\nprint(dates)\r\n\r\nlocalized_dates = dates.tz_localize('Asia/Kolkata')\r\n\r\nprint(\"\\n3. After Localizing to Asia/Kolkata:\")\r\nprint(localized_dates)\r\n\r\nnew_york_dates = localized_dates.tz_convert(\r\n    'America/New_York'\r\n)\r\n\r\nprint(\"\\n4. Converted to America/New_York:\")\r\nprint(new_york_dates)\r\n\r\n\r\nindia_series = pd.Series(\r\n    [100, 200, 300],\r\n    index=localized_dates\r\n)\r\n\r\nnew_york_series = pd.Series(\r\n    [400, 500, 600],\r\n    index=new_york_dates\r\n)\r\n\r\nprint(\"\\n5. India Time Series:\")\r\nprint(india_series)\r\n\r\nprint(\"\\nNew York Time Series:\")\r\nprint(new_york_series)\r\n\r\ncombined_series = pd.concat([\r\n    india_series,\r\n    new_york_series\r\n])\r\n\r\nprint(\"\\n6. Combined Time Series:\")\r\nprint(combined_series)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nShows tz-aware ranges, attaches a zone to naive data,\nconverts between zones and combines the results.\n\nKEY POINTS\n- tz='Asia/Kolkata' builds a tz-aware range straight away\n- tz_localize() attaches a zone to a NAIVE index\n- tz_convert() moves the SAME instants to another zone\n- pd.concat() stacks two tz-aware Series together\n\nWATCH OUT\n- localize is for naive data; convert is for aware data\n- calling the wrong one raises an error\n- concatenating mixed naive/aware indexes fails"
      },
      {
        "id": "d",
        "letter": "D",
        "title": "Period objects and period arithmetic",
        "video": "assets/videos/exp6-d.mp4",
        "code": "import pandas as pd\r\n\r\np = pd.Period('2026-01', freq='M')\r\n\r\nprint(\"Original Period:\")\r\nprint(p)\r\n\r\nprint(\"\\nAfter adding 2:\")\r\nprint(p + 2)\r\n\r\nprint(\"\\nAfter adding 5:\")\r\nprint(p + 5)\r\n\r\nprint(\"\\nAfter subtracting 1:\")\r\nprint(p - 1)\r\n\r\nprint(\"\\nAfter subtracting 3:\")\r\nprint(p - 3)\r\n\r\nperiods = pd.period_range(\r\n    start='2026-01',\r\n    periods=6,\r\n    freq='M'\r\n)\r\n\r\nprint(\"\\nRange of Periods:\")\r\nprint(periods)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nRepresents a whole month as one Period and moves it\nforward and backward by whole periods.\n\nKEY POINTS\n- pd.Period('2026-01', freq='M') means the month of Jan\n- adding/subtracting an integer shifts whole periods\n- pd.period_range() builds a sequence of periods\n\nWATCH OUT\n- a Period is a SPAN; a Timestamp is an instant\n- period math stays calendar-correct across year ends"
      },
      {
        "id": "e",
        "letter": "E",
        "title": "Converting periods and PeriodIndex to another frequency",
        "video": "assets/videos/exp6-e.mp4",
        "code": "import pandas as pd\r\np = pd.Period('2026-01', freq='M')\r\n\r\nprint(\"Original Period:\")\r\nprint(p)\r\n\r\n\r\ndaily_start = p.asfreq('D', how='start')\r\n\r\nprint(\"\\nMonthly Period converted to Daily (Start):\")\r\nprint(daily_start)\r\n\r\n\r\ndaily_end = p.asfreq('D', how='end')\r\n\r\nprint(\"\\nMonthly Period converted to Daily (End):\")\r\nprint(daily_end)\r\n\r\n\r\nperiod_index = pd.period_range(\r\n    start='2026-01',\r\n    periods=3,\r\n    freq='M'\r\n)\r\n\r\nprint(\"\\nOriginal PeriodIndex:\")\r\nprint(period_index)\r\n\r\n\r\ndaily_period_index = period_index.asfreq(\r\n    'D',\r\n    how='start'\r\n)\r\n\r\nprint(\"\\nPeriodIndex converted to Daily Frequency:\")\r\nprint(daily_period_index)\r\n\r\n\r\ndaily_period_index_end = period_index.asfreq(\r\n    'D',\r\n    how='end'\r\n)\r\n\r\nprint(\"\\nPeriodIndex converted to Daily Frequency (End):\")\r\nprint(daily_period_index_end)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nExpands monthly periods down to daily frequency, at\nthe start and the end of each month.\n\nKEY POINTS\n- asfreq('D', how='start') -> the first day of the month\n- asfreq('D', how='end') -> the last day of the month\n- PeriodIndex.asfreq() converts every entry at once\n\nWATCH OUT\n- how= decides which day stands in for the whole month\n- conversion keeps the label, it does not invent rows"
      },
      {
        "id": "f",
        "letter": "F",
        "title": "Converting a Series and DataFrame to periods",
        "video": "assets/videos/exp6-f.mp4",
        "code": "import pandas as pd\r\n\r\n\r\ndates = pd.to_datetime([\r\n    '2026-01-10',\r\n    '2026-02-15',\r\n    '2026-03-20',\r\n    '2026-04-25'\r\n])\r\n\r\nsales = pd.Series(\r\n    [1000, 1500, 1800, 2200],\r\n    index=dates\r\n)\r\n\r\nprint(\"Original Series:\")\r\nprint(sales)\r\n\r\n\r\n\r\nperiod_series = sales.to_period('M')\r\n\r\nprint(\"\\nSeries converted to Monthly Periods:\")\r\nprint(period_series)\r\n\r\n\r\n\r\ndf = pd.DataFrame(\r\n    {\r\n        'Sales': [1000, 1500, 1800, 2200],\r\n        'Profit': [200, 300, 400, 500]\r\n    },\r\n    index=dates\r\n)\r\n\r\nprint(\"\\nOriginal DataFrame:\")\r\nprint(df)\r\n\r\n\r\nperiod_df = df.to_period('M')\r\n\r\nprint(\"\\nDataFrame converted to Monthly Periods:\")\r\nprint(period_df)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nCasts timestamp-indexed data down to monthly periods,\nfor a Series and then for a DataFrame.\n\nKEY POINTS\n- Series.to_period('M') returns a period-indexed Series\n- DataFrame.to_period('M') converts the whole index\n- handy before monthly grouping or plotting\n\nWATCH OUT\n- detail below the period frequency is dropped\n- several rows in one month become the same period label"
      },
      {
        "id": "g",
        "letter": "G",
        "title": "Resampling: downsampling, upsampling and forward fill",
        "video": "assets/videos/exp6-g.mp4",
        "code": "import pandas as pd\r\n\r\n\r\ndates = pd.date_range(\r\n    start='2026-01-01 00:00',\r\n    periods=12,\r\n    freq='h'\r\n)\r\n\r\nvalues = [10, 12, 15, 14, 18, 20,\r\n          22, 21, 25, 28, 30, 32]\r\n\r\ntime_series = pd.Series(\r\n    values,\r\n    index=dates\r\n)\r\n\r\nprint(\"Original Hourly Time Series:\")\r\nprint(time_series)\r\n\r\n\r\nresampled = time_series.resample('3h').mean()\r\n\r\nprint(\"\\nResampled Time Series - 3 Hour Mean:\")\r\nprint(resampled)\r\n\r\n\r\n\r\ndownsampled = time_series.resample('4h').sum()\r\n\r\nprint(\"\\nDownsampled Time Series - 4 Hour Sum:\")\r\nprint(downsampled)\r\n\r\n\r\n\r\nupsampled = time_series.resample('30min').asfreq()\r\n\r\nprint(\"\\nUpsampled Time Series - 30 Minute:\")\r\nprint(upsampled)\r\n\r\n\r\n\r\nupsampled_ffill = time_series.resample('30min').ffill()\r\n\r\nprint(\"\\nUpsampled Time Series using Forward Fill:\")\r\nprint(upsampled_ffill)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nChanges an hourly series to coarser and finer time\nbuckets, and fills the gaps that upsampling leaves.\n\nKEY POINTS\n- resample('3h').mean() averages within 3-hour buckets\n- resample('4h').sum() totals within 4-hour buckets\n- resample('30min').asfreq() upsamples and adds NaN\n- .ffill() carries the last value into empty buckets\n\nWATCH OUT\n- upsampling always creates gaps - choose the fill rule\n- the resample label defaults to the left edge of a bin"
      }
    ]
  },
  {
    "id": 7,
    "name": "GroupBy and Aggregation in pandas",
    "tagline": "Splitting data into groups and computing summary statistics.",
    "previewVideo": "assets/videos/exp7-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment is about the split-apply-combine pattern in pandas. It begins by grouping a small student DataFrame by a single column (Department) and then by two columns (Department and Year), printing each group and the mean marks per group. The next part applies several aggregations at once with groupby().aggregate(), returning sum, mean and standard deviation for both Marks and Attendance and producing a column MultiIndex. The final part runs the same ideas on the real Iris dataset loaded from a URL: head/info/describe for a first look, groupby on a single column with a list of aggregations, groupby on multiple columns, an aggregate dictionary across four measure columns, and value_counts to count records per species.",
    "sections": [
      {
        "id": "a",
        "letter": "A",
        "title": "Grouping by a single and multiple columns",
        "video": "assets/videos/exp7-a.mp4",
        "code": "import pandas as pd\r\ndata = {\r\n    'Name': ['Ravi', 'Sita', 'Arun', 'Priya', 'Kiran', 'Anil', 'Lakshmi', 'Rahul'],\r\n    'Department': ['CSE', 'CSE', 'ECE', 'ECE', 'CSE', 'ECE', 'CSE', 'ECE'],\r\n    'Year': [2, 2, 3, 3, 2, 3, 3, 2],\r\n    'Marks': [85, 90, 78, 88, 75, 82, 95, 70]\r\n}\r\ndf = pd.DataFrame(data)\r\n\r\nprint(\"Original DataFrame:\")\r\nprint(df)\r\n\r\nprint(\"\\n1. Group by Department:\")\r\n\r\ngroup1 = df.groupby('Department')\r\n\r\nfor name, group in group1:\r\n    print(\"\\nDepartment:\", name)\r\n    print(group)\r\nprint(\"\\nAverage Marks by Department:\")\r\nprint(df.groupby('Department')['Marks'].mean())\r\n\r\nprint(\"\\n2. Group by Department and Year:\")\r\n\r\ngroup2 = df.groupby(['Department', 'Year'])\r\n\r\nfor name, group in group2:\r\n    print(\"\\nGroup:\", name)\r\n    print(group)\r\n\r\nprint(\"\\nAverage Marks by Department and Year:\")\r\nprint(df.groupby(['Department', 'Year'])['Marks'].mean())",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nSplits a student table by Department, then by\nDepartment and Year, and averages the marks.\n\nKEY POINTS\n- df.groupby('Department') groups the rows\n- iterating a GroupBy yields (name, group) pairs\n- groupby(['Department','Year']) groups by a pair\n- ['Marks'].mean() aggregates a single column\n\nWATCH OUT\n- groupby alone computes nothing until you aggregate\n- the group key becomes the result index"
      },
      {
        "id": "b",
        "letter": "B",
        "title": "Aggregating multiple columns with sum, mean and std",
        "video": "assets/videos/exp7-b.mp4",
        "code": "import pandas as pd\r\ndata = {\r\n    'Department': ['CSE', 'CSE', 'CSE', 'ECE', 'ECE', 'ECE',\r\n                   'EEE', 'EEE', 'EEE'],\r\n    'Marks': [80, 75, 85, 70, 65, 75, 90, 85, 95],\r\n    'Attendance': [90, 85, 95, 80, 75, 85, 95, 90, 100]\r\n}\r\n\r\ndf = pd.DataFrame(data)\r\n\r\nprint(\"Original DataFrame:\")\r\nprint(df)\r\nresult = df.groupby('Department').aggregate({\r\n    'Marks': ['sum', 'mean', 'std'],\r\n    'Attendance': ['sum', 'mean', 'std']\r\n})\r\n\r\nprint(\"\\nSummary Statistics:\")\r\nprint(result)",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nApplies three statistics to two columns in one call\nusing an aggregate dictionary.\n\nKEY POINTS\n- .aggregate({col: [funcs]}) maps functions to columns\n- sum/mean/std summarise each group at once\n- the result is a DataFrame with a column MultiIndex\n\nWATCH OUT\n- nested columns can be awkward - flatten with a loop\n- std is undefined for a group with a single row"
      },
      {
        "id": "c",
        "letter": "C",
        "title": "GroupBy analysis on the Iris dataset",
        "video": "assets/videos/exp7-c.mp4",
        "code": "import pandas as pd\r\n\r\nurl=\"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv\"\r\ndf = pd.read_csv(url)\r\n\r\nprint(\"First 5 Records:\")\r\nprint(df.head())\r\n\r\nprint(\"\\nDataset Information:\")\r\nprint(df.info())\r\n\r\nprint(\"\\nStatistical Summary:\")\r\nprint(df.describe())\r\nprint(\"\\n1. GroupBy using a Single Column:\")\r\ngroup_single = df.groupby('species')['sepal_length'].agg(\r\n    ['count', 'sum', 'mean', 'std', 'min', 'max']\r\n)\r\nprint(group_single)\r\n\r\nprint(\"\\n2. GroupBy using Multiple Columns:\")\r\ngroup_multiple = df.groupby(\r\n    ['species', 'sepal_width']\r\n)['sepal_length'].mean()\r\nprint(group_multiple.head(15))\r\n\r\n\r\nprint(\"\\n3. Summary Statistics:\")\r\nsummary = df.groupby('species').agg({\r\n    'sepal_length': ['mean', 'std', 'min', 'max'],\r\n    'sepal_width': ['mean', 'std', 'min', 'max'],\r\n    'petal_length': ['mean', 'std', 'min', 'max'],\r\n    'petal_width': ['mean', 'std', 'min', 'max']\r\n})\r\n\r\nprint(summary)\r\n\r\nprint(\"\\n4. Number of Records in Each Species:\")\r\nprint(df['species'].value_counts())\r\n\r\nprint(\"\\nAverage Petal Length by Species:\")\r\nprint(df.groupby('species')['petal_length'].mean())\r\n\r\nprint(\"\\nAverage Petal Width by Species:\")\r\nprint(df.groupby('species')['petal_width'].mean())\r\n\r\nprint(\"\\nMaximum Sepal Length by Species:\")\r\nprint(df.groupby('species')['sepal_length'].max())",
        "outputImage": "",
        "notes": "WHAT THIS DOES\nLoads the Iris dataset from a URL and applies the\nwhole GroupBy toolkit to it.\n\nKEY POINTS\n- read_csv(url) reads straight from the web\n- .agg(['count','sum','mean','std','min','max'])\n- groupby on several columns nests the result index\n- value_counts() counts records per species\n\nWATCH OUT\n- this part needs internet access for the CSV\n- groupby(['species','sepal_width']) makes many tiny groups"
      }
    ]
  },
  {
    "id": 8,
    "name": "Web Scraping and Sentiment Analysis of Product Reviews",
    "tagline": "Extract product reviews, analyze sentiment and text statistics, and visualize results.",
    "previewVideo": "assets/videos/exp8-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment builds a product-review analysis workflow. It extracts review titles, text, and ratings from locally saved HTML with BeautifulSoup, saves them as CSV, classifies review sentiment with VADER, and generates word clouds. It also calculates text statistics such as word, character, numeric-token, and stopword counts, compares the NLTK and standalone VADER implementations, and plots sentiment intensity.",
    "sections": [
      {
        "id": "a", "letter": "A", "title": "Extracting product reviews from HTML", "video": "assets/videos/exp8-a.mp4",
        "code": "from bs4 import BeautifulSoup\nimport pandas as pd\n\nwith open(\"reviews.html\", \"r\", encoding=\"utf-8\") as file:\n    html_content = file.read()\n\nsoup = BeautifulSoup(html_content, \"html.parser\")\nreview_blocks = soup.select(\".review\")\nrecords = []\n\nfor block in review_blocks:\n    review_element = block.select_one(\".review-text\")\n    rating_element = block.select_one(\".rating\")\n    title_element = block.select_one(\".review-title\")\n    review_text = review_element.get_text(\" \", strip=True) if review_element else \"\"\n    rating_text = rating_element.get_text(\" \", strip=True) if rating_element else \"\"\n    title = title_element.get_text(\" \", strip=True) if title_element else \"\"\n    if review_text:\n        records.append({\"title\": title, \"review\": review_text, \"rating\": rating_text})\n\ndf = pd.DataFrame(records)\ndf.to_csv(\"product_reviews.csv\", index=False, encoding=\"utf-8-sig\")\nprint(df.head())\nprint(\"Total reviews extracted:\", len(df))",
        "outputImage": "", "notes": "WHAT THIS DOES\nReads locally saved HTML, selects review blocks, extracts each title, review and rating, then writes a CSV.\n\nKEY POINTS\n- BeautifulSoup parses the HTML document\n- CSS selectors locate review elements\n- Missing optional elements become empty strings\n- pandas DataFrame stores the extracted records\n\nWATCH OUT\n- Update selectors when the source HTML structure changes\n- Run from the folder containing reviews.html"
      },
      {
        "id": "b", "letter": "B", "title": "Classifying sentiment and generating word clouds", "video": "assets/videos/exp8-b.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nfrom wordcloud import WordCloud\nfrom vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer\n\ndf = pd.read_csv(\"product_reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\nanalyzer = SentimentIntensityAnalyzer()\n\ndef classify_sentiment(text):\n    score = analyzer.polarity_scores(text)[\"compound\"]\n    if score >= 0.05:\n        return \"Positive\"\n    elif score <= -0.05:\n        return \"Negative\"\n    return \"Neutral\"\n\ndf[\"sentiment\"] = df[\"review\"].apply(classify_sentiment)\n\ndef generate_wordcloud(text, title, filename):\n    if not text.strip():\n        return\n    cloud = WordCloud(width=1200, height=600, background_color=\"white\", max_words=150, collocations=False).generate(text)\n    plt.figure(figsize=(12, 6))\n    plt.imshow(cloud, interpolation=\"bilinear\")\n    plt.axis(\"off\")\n    plt.title(title)\n    plt.tight_layout()\n    plt.savefig(filename, dpi=300, bbox_inches=\"tight\")\n    plt.show()\n\nall_text = \" \".join(df[\"review\"])\ngenerate_wordcloud(all_text, \"WordCloud - All Reviews\", \"wordcloud_all.png\")\npositive_text = \" \".join(df.loc[df[\"sentiment\"] == \"Positive\", \"review\"])\ngenerate_wordcloud(positive_text, \"WordCloud - Positive Reviews\", \"wordcloud_positive.png\")\nnegative_text = \" \".join(df.loc[df[\"sentiment\"] == \"Negative\", \"review\"])\ngenerate_wordcloud(negative_text, \"WordCloud - Negative Reviews\", \"wordcloud_negative.png\")\ndf.to_csv(\"product_reviews_analyzed.csv\", index=False)\nprint(df[\"sentiment\"].value_counts())",
        "outputImage": "", "notes": "WHAT THIS DOES\nScores review text with VADER, assigns positive, negative or neutral labels, and creates word clouds for all, positive and negative reviews.\n\nKEY POINTS\n- Compound scores at or above 0.05 are positive\n- Scores at or below -0.05 are negative\n- Values between the thresholds are neutral\n- WordCloud turns frequent terms into an image\n\nWATCH OUT\n- Install vaderSentiment, wordcloud and matplotlib\n- Empty sentiment groups do not produce a cloud"
      },
      {
        "id": "c", "letter": "C", "title": "Review text statistics and distributions", "video": "assets/videos/exp8-c.mp4",
        "code": "import re\nimport pandas as pd\nimport nltk\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nfrom nltk.corpus import stopwords\nfrom collections import Counter\n\nnltk.download(\"stopwords\", quiet=True)\ndf = pd.read_csv(\"product_reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\nstop_words = set(stopwords.words(\"english\"))\n\ndef analyze_review(text):\n    tokens = re.findall(r\"\\b[\\w']+\\b\", text.lower())\n    words = re.findall(r\"\\b[A-Za-z]+\\b\", text)\n    numeric_tokens = re.findall(r\"\\b\\d+(?:\\.\\d+)?\\b\", text)\n    stopword_tokens = [token for token in tokens if token in stop_words]\n    return pd.Series({\"word_count\": len(tokens), \"character_count\": len(text), \"numeric_count\": len(numeric_tokens), \"stopword_count\": len(stopword_tokens), \"average_word_length\": sum(map(len, words)) / len(words) if words else 0})\n\nstatistics = df[\"review\"].apply(analyze_review)\ndf = pd.concat([df, statistics], axis=1)\ndf.to_csv(\"review_statistics.csv\", index=False)\ncolumns = [(\"stopword_count\", \"Stopword Count\"), (\"numeric_count\", \"Numeric Token Count\"), (\"word_count\", \"Word Count\"), (\"character_count\", \"Character Count\"), (\"average_word_length\", \"Average Word Length\")]\nfig, axes = plt.subplots(3, 2, figsize=(14, 15))\naxes = axes.flatten()\nfor i, (column, title) in enumerate(columns):\n    sns.histplot(data=df, x=column, kde=True, ax=axes[i], bins=20)\n    axes[i].set_title(title)\n    axes[i].set_xlabel(title)\n    axes[i].set_ylabel(\"Number of Reviews\")\naxes[-1].axis(\"off\")\nplt.tight_layout()\nplt.savefig(\"review_statistics_distributions.png\", dpi=300)\nplt.show()\nall_tokens = re.findall(r\"\\b[\\w']+\\b\", \" \".join(df[\"review\"]).lower())\nprint(Counter(token for token in all_tokens if token in stop_words).most_common(10))\nprint(df[[\"stopword_count\", \"numeric_count\", \"word_count\", \"character_count\", \"average_word_length\"]].describe())",
        "outputImage": "", "notes": "WHAT THIS DOES\nComputes five text metrics for every review, saves the enriched table, and plots their distributions.\n\nKEY POINTS\n- Regular expressions tokenize words and numbers\n- NLTK supplies English stopwords\n- Average word length ignores nonalphabetic tokens\n- Seaborn histograms show each metric's distribution\n\nWATCH OUT\n- NLTK stopwords must be downloaded once\n- Empty reviews produce zero average word length"
      },
      {
        "id": "d", "letter": "D", "title": "Comparing NLTK and standalone VADER", "video": "assets/videos/exp8-d.mp4",
        "code": "import pandas as pd\nimport nltk\nfrom nltk.sentiment.vader import SentimentIntensityAnalyzer as NLTKVADER\nfrom vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as StandaloneVADER\n\nnltk.download(\"vader_lexicon\", quiet=True)\ndf = pd.read_csv(\"product_reviews.csv\")\ndf[\"review\"] = df[\"review\"].fillna(\"\").astype(str)\nnltk_analyzer = NLTKVADER()\nvader_analyzer = StandaloneVADER()\n\ndef classify(score):\n    if score >= 0.05:\n        return \"Positive\"\n    elif score <= -0.05:\n        return \"Negative\"\n    return \"Neutral\"\n\nnltk_scores = df[\"review\"].apply(nltk_analyzer.polarity_scores)\nfor key in [\"pos\", \"neg\", \"neu\", \"compound\"]:\n    df[\"nltk_\" + key] = nltk_scores.apply(lambda score: score[key])\nvader_scores = df[\"review\"].apply(vader_analyzer.polarity_scores)\nfor key in [\"pos\", \"neg\", \"neu\", \"compound\"]:\n    df[\"vader_\" + key] = vader_scores.apply(lambda score: score[key])\ndf[\"nltk_sentiment\"] = df[\"nltk_compound\"].apply(classify)\ndf[\"vader_sentiment\"] = df[\"vader_compound\"].apply(classify)\nprint(df[[\"review\", \"nltk_compound\", \"nltk_sentiment\", \"vader_compound\", \"vader_sentiment\"]].head(10).to_string(index=False))\nprint(df[\"nltk_sentiment\"].value_counts())\nprint(df[\"vader_sentiment\"].value_counts())\ndf.to_csv(\"sentiment_analysis_results.csv\", index=False)",
        "outputImage": "", "notes": "WHAT THIS DOES\nRuns each review through NLTK's VADER and the standalone vaderSentiment package, then compares scores and labels.\n\nKEY POINTS\n- Both analyzers return positive, negative, neutral and compound scores\n- Compound scores are mapped to three sentiment labels\n- Results are saved for later visualization\n\nWATCH OUT\n- Install both VADER packages and download the NLTK lexicon\n- The input file must be product_reviews.csv"
      },
      {
        "id": "e", "letter": "E", "title": "Plotting sentiment intensity across reviews", "video": "assets/videos/exp8-e.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf = pd.read_csv(\"sentiment_analysis_results.csv\")\ndf[\"vader_compound\"] = pd.to_numeric(df[\"vader_compound\"], errors=\"coerce\")\ndf = df.dropna(subset=[\"vader_compound\"]).reset_index(drop=True)\ndf[\"review_index\"] = range(1, len(df) + 1)\npalette = {\"Positive\": \"green\", \"Negative\": \"red\", \"Neutral\": \"gray\"}\nplt.figure(figsize=(14, 7))\nsns.scatterplot(data=df, x=\"review_index\", y=\"vader_compound\", hue=\"vader_sentiment\", palette=palette, s=70, alpha=0.8)\nplt.axhline(y=0.05, color=\"green\", linestyle=\"--\", label=\"Positive threshold\")\nplt.axhline(y=-0.05, color=\"red\", linestyle=\"--\", label=\"Negative threshold\")\nplt.axhline(y=0, color=\"black\", linestyle=\":\", label=\"Neutral reference\")\nplt.ylim(-1.05, 1.05)\nplt.xlabel(\"Review Index\")\nplt.ylabel(\"VADER Compound Sentiment Score\")\nplt.title(\"Sentiment Intensity of Product Reviews\")\nplt.legend(loc=\"best\")\nplt.grid(alpha=0.25)\nplt.tight_layout()\nplt.savefig(\"sentiment_intensity_scatter.png\", dpi=300)\nplt.show()",
        "outputImage": "", "notes": "WHAT THIS DOES\nPlots the compound sentiment score for each review and colors points by their sentiment class.\n\nKEY POINTS\n- Scores range from -1 (negative) to +1 (positive)\n- Dashed lines mark the classification thresholds\n- The neutral reference line is zero\n\nWATCH OUT\n- Run section D first to create the results CSV\n- Rows without valid compound scores are omitted"
      }
    ]
  },
  {
    "id": 9,
    "name": "Visualizing Sentiment Intensity of Product Reviews",
    "tagline": "Plot VADER compound scores and sentiment thresholds for each review.",
    "previewVideo": "assets/videos/exp9-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment loads the sentiment analysis results, converts VADER compound scores to numeric values, removes invalid rows, and plots one point per review. Point colors show positive, negative, or neutral classifications, while horizontal reference lines mark the classification thresholds and neutral score.",
    "sections": [
      {
        "id": "a", "letter": "A", "title": "Scatter plot of review sentiment scores", "video": "assets/videos/exp9-a.mp4",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndf = pd.read_csv(\"sentiment_analysis_results.csv\")\ndf[\"vader_compound\"] = pd.to_numeric(df[\"vader_compound\"], errors=\"coerce\")\ndf = df.dropna(subset=[\"vader_compound\"]).reset_index(drop=True)\ndf[\"review_index\"] = range(1, len(df) + 1)\npalette = {\"Positive\": \"green\", \"Negative\": \"red\", \"Neutral\": \"gray\"}\nplt.figure(figsize=(14, 7))\nsns.scatterplot(data=df, x=\"review_index\", y=\"vader_compound\", hue=\"vader_sentiment\", palette=palette, s=70, alpha=0.8)\nplt.axhline(y=0.05, color=\"green\", linestyle=\"--\", label=\"Positive threshold\")\nplt.axhline(y=-0.05, color=\"red\", linestyle=\"--\", label=\"Negative threshold\")\nplt.axhline(y=0, color=\"black\", linestyle=\":\", label=\"Neutral reference\")\nplt.ylim(-1.05, 1.05)\nplt.xlabel(\"Review Index\")\nplt.ylabel(\"VADER Compound Sentiment Score\")\nplt.title(\"Sentiment Intensity of Product Reviews\")\nplt.legend(loc=\"best\")\nplt.grid(alpha=0.25)\nplt.tight_layout()\nplt.savefig(\"sentiment_intensity_scatter.png\", dpi=300)\nplt.show()\nprint(\"Scatter intensity plot saved successfully.\")",
        "outputImage": "", "notes": "WHAT THIS DOES\nCreates a scatter plot of compound sentiment scores, one point per review.\n\nKEY POINTS\n- Seaborn colors points by sentiment label\n- Horizontal lines show positive, negative and neutral references\n- The chart is saved as a high-resolution PNG\n\nWATCH OUT\n- Requires sentiment_analysis_results.csv from the previous analysis\n- Install pandas, matplotlib and seaborn"
      }
    ]
  },
  {
    "id": 10,
    "name": "Text Classification with Multinomial Naive Bayes",
    "tagline": "Vectorize sample text with word counts and predict sentiment labels.",
    "previewVideo": "assets/videos/exp10-preview.mp4",
    "youtubeVideo": "",
    "youtubeLink": "",
    "githubLink": "",
    "summary": "This experiment demonstrates a basic supervised text-classification workflow. CountVectorizer converts a small set of labeled sentences into word-count features, MultinomialNB learns the relationship between those features and labels, and the trained model predicts a class for a new sentence.",
    "sections": [
      {
        "id": "a", "letter": "A", "title": "Training and testing a Naive Bayes text classifier", "video": "assets/videos/exp10-a.mp4",
        "code": "from sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ntexts = ['I am happy', 'I am angry', 'I feel sad', 'I love this']\nlabels = ['happy', 'angry', 'sad', 'happy']\n\nvec = CountVectorizer()\nX = vec.fit_transform(texts)\nmodel = MultinomialNB()\nmodel.fit(X, labels)\n\ntest = vec.transform(['I am so sad today'])\nprint(model.predict(test))",
        "outputImage": "", "notes": "WHAT THIS DOES\nLearns a text classifier from four labeled example sentences and predicts a label for a new sentence.\n\nKEY POINTS\n- CountVectorizer builds a vocabulary and word-count matrix\n- MultinomialNB fits a probabilistic classifier\n- New text must use the same fitted vectorizer\n\nWATCH OUT\n- The tiny sample dataset is only for demonstration\n- Unseen words do not add features to the fitted vocabulary\n- Install scikit-learn"
      }
    ]
  }
];

/* -------------------------------------------------------------------------
   3b. TOOLS  (shown on the Tools & Technologies page)
   -------------------------------------------------------------------------
   Each tool supports:
     id         unique key (used for editing / deleting in the browser)
     name       tool name shown as the card heading
     desc       one-line description
     category   short grouping label shown as a chip
     type       e.g. Language, Library, Database, Workflow
     language   primary programming language
     platforms  supported platforms
     website    official website (optional)
     docs       documentation URL (optional)
     github     repository URL (optional)
     install    installation instructions (optional)
     usage      usage notes (optional)
     related    related technologies (optional)
     tags       comma separated tags
     status     Active | Inactive
     created    date string, e.g. "2026-01-01"
     exps       experiment ids this tool appears in (shown as a chip)
     url        "Learn More" link opened by the card button

   Tools created through the "Add Tool" form in the browser are stored in
   localStorage and shown together with the entries below.
   ------------------------------------------------------------------------- */
var tools = [
  {
    "id": "python",
    "name": "Python",
    "desc": "Programming language for data analysis & experiments",
    "category": "Programming Language",
    "type": "Language",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://www.python.org/",
    "docs": "https://docs.python.org/3/",
    "github": "",
    "status": "Active",
    "tags": "python, programming",
    "created": "2026-01-01",
    "exps": [1, 2, 3, 4, 5, 6, 7],
    "url": "https://www.geeksforgeeks.org/python-programming-language/"
  },
  {
    "id": "pandas",
    "name": "Pandas",
    "desc": "Data manipulation and analysis library",
    "category": "Data Analysis",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://pandas.pydata.org/",
    "docs": "https://pandas.pydata.org/docs/",
    "github": "",
    "status": "Active",
    "tags": "python, dataframe, data",
    "created": "2026-01-01",
    "exps": [1, 2, 3, 4, 5, 6, 7],
    "url": "https://www.geeksforgeeks.org/pandas-tutorial/"
  },
  {
    "id": "numpy",
    "name": "NumPy",
    "desc": "Numerical computing library",
    "category": "Numerical Computing",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://numpy.org/",
    "docs": "https://numpy.org/doc/",
    "github": "",
    "status": "Active",
    "tags": "python, arrays, math",
    "created": "2026-01-01",
    "exps": [1, 3, 4, 5],
    "url": "https://www.geeksforgeeks.org/numpy-tutorial/"
  },
  {
    "id": "matplotlib",
    "name": "Matplotlib",
    "desc": "2D plotting library for visualizations",
    "category": "Visualization",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://matplotlib.org/",
    "docs": "https://matplotlib.org/stable/",
    "github": "",
    "status": "Active",
    "tags": "python, plots, charts",
    "created": "2026-01-01",
    "exps": [5],
    "url": "https://www.geeksforgeeks.org/matplotlib-tutorial/"
  },
  {
    "id": "seaborn",
    "name": "Seaborn",
    "desc": "Statistical data visualization library",
    "category": "Visualization",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://seaborn.pydata.org/",
    "docs": "https://seaborn.pydata.org/api.html",
    "github": "",
    "status": "Active",
    "tags": "python, statistics, plots",
    "created": "2026-01-01",
    "exps": [5],
    "url": "https://www.geeksforgeeks.org/seaborn-tutorial/"
  },
  {
    "id": "requests",
    "name": "Requests",
    "desc": "HTTP library for API calls",
    "category": "Web & APIs",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://requests.readthedocs.io/",
    "docs": "https://requests.readthedocs.io/en/latest/",
    "github": "",
    "status": "Active",
    "tags": "python, http, api",
    "created": "2026-01-01",
    "exps": [2],
    "url": "https://www.geeksforgeeks.org/python-requests-tutorial/"
  },
  {
    "id": "sqlite",
    "name": "SQLite",
    "desc": "Lightweight relational database",
    "category": "Database",
    "type": "Database",
    "language": "SQL",
    "platforms": "Windows, macOS, Linux",
    "website": "https://www.sqlite.org/",
    "docs": "https://www.sqlite.org/docs.html",
    "github": "",
    "status": "Active",
    "tags": "sql, database",
    "created": "2026-01-01",
    "exps": [2],
    "url": "https://www.geeksforgeeks.org/sqlite-tutorial/"
  },
  {
    "id": "regex",
    "name": "Regex (re)",
    "desc": "Regular expressions for pattern matching",
    "category": "Text Processing",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://docs.python.org/3/library/re.html",
    "docs": "https://docs.python.org/3/library/re.html",
    "github": "",
    "status": "Active",
    "tags": "python, regex, text",
    "created": "2026-01-01",
    "exps": [3],
    "url": "https://www.geeksforgeeks.org/python-regex/"
  },
  {
    "id": "pandas-datetime",
    "name": "Datetime (pandas)",
    "desc": "Date/time parsing, time zones, periods & resampling",
    "category": "Time Series",
    "type": "Library",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://pandas.pydata.org/docs/user_guide/timeseries.html",
    "docs": "https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html",
    "github": "",
    "status": "Active",
    "tags": "python, time series, dates",
    "created": "2026-01-01",
    "exps": [6],
    "url": "https://www.geeksforgeeks.org/python-pandas-to-datetime/"
  },
  {
    "id": "groupby",
    "name": "GroupBy",
    "desc": "Split-apply-combine grouping & aggregation",
    "category": "Data Analysis",
    "type": "Workflow",
    "language": "Python",
    "platforms": "Windows, macOS, Linux",
    "website": "https://pandas.pydata.org/docs/user_guide/groupby.html",
    "docs": "https://pandas.pydata.org/docs/reference/groupby.html",
    "github": "",
    "status": "Active",
    "tags": "python, groupby, aggregation",
    "created": "2026-01-01",
    "exps": [7],
    "url": "https://www.geeksforgeeks.org/pandas-groupby/"
  }
];

/* -------------------------------------------------------------------------
   4. PROJECTS  (shown on the Projects showcase page)
   -------------------------------------------------------------------------
   Each project supports:
     title     project name shown as the card heading
     tools     short list of technologies / concepts, shown as a chip
     desc      one-paragraph description of what the project does
     github    repository URL shown as the card button
               (leave it as "" to hide the button automatically)

   These are the student's own projects. Add, edit or remove entries freely.
   ------------------------------------------------------------------------- */
var projects = [
  // {
  //   "title": "Console Sudoku Puzzle Generator & Player",
  //   "tools": "Java, OOP, Backtracking",
  //   "desc": "A console-based Sudoku game written in Java. A randomized backtracking algorithm fills a complete 9x9 grid that satisfies every Sudoku rule, and the chosen difficulty (Easy, Medium or Hard) decides how many starting clues are kept. The player enters a row, column and value to fill the empty cells; every move is validated against the row, column and 3x3 box constraints, wrong moves are counted, and the game announces a win the moment the board is completed.",
  //   "github": "https://github.com/Kanishka1256/Sudoku-Puzzle"
  // },
  // {
  //   "title": "Tango Binary Logic Puzzle",
  //   "tools": "Java, OOP, Backtracking",
  //   "desc": "A console implementation of the Tango binary logic puzzle in Java. A backtracking generator builds a valid 6x6 grid in which every row and column holds exactly three 0s and three 1s and no three identical symbols ever sit next to each other. Difficulty settings control how many cells are removed, and the player restores the grid move by move, with each entry checked against the balance and no-three-in-a-row rules before the win condition is confirmed.",
  //   "github": "https://github.com/Kanishka1256/Tango-puzzle"
  // }
];

/* Make the arrays available to the app, both in the browser and in Node tests. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { laboratory, labMeta, student, social, modules, experiments, tools, projects };
}
