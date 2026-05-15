curl "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" > 3party/a.css
curl "https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js" > 3party/js-yaml.min.js

cd 3party 

for i in `grep -r https | cut -d '(' -f 2  | grep ttf | cut -d ')' -f 1`; do curl -LO "$i" ; done
