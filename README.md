# Conflict Cost Analysis Tool

A simple, static web application for analyzing and calculating conflict costs in organizations. This tool helps HR professionals, conflict managers, and consultants systematically document and evaluate both direct and indirect costs associated with workplace conflicts.

## Features

- **Multi-language Support**: Available in 9 languages
  - English (default)
  - German (Deutsch)
  - Spanish (Español)
  - Portuguese (Português)
  - Italian (Italiano)
  - Polish (Polski)
  - Bulgarian (Български)
  - Hindi (हिन्दी)
  - Kannada (ಕನ್ನಡ)

- **Comprehensive Cost Tracking**:
  - Direct costs (salary, consultants, legal fees, severance)
  - Indirect costs (productivity loss, motivation loss, turnover, reputation damage)
  - Automatic calculation of totals

- **Data Entry Form**: Structured collection of conflict information including:
  - Basic conflict data (ID, parties, dates, duration)
  - Cost categorization
  - Additional factors (cause, intensity, solution type, long-term effects)

- **Export Functionality**: Export complete analysis as JSON for record-keeping

- **No Backend Required**: Fully client-side application, perfect for hosting on GitHub Pages

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Bootstrap 5 (via CDN) for styling
- **Vanilla JavaScript**: No framework dependencies
- **i18n**: Custom lightweight internationalization implementation

## Installation & Deployment

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/xitrox/ConflictCost.git
   cd ConflictCost
   ```

2. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. Navigate to `http://localhost:8000` in your browser

### GitHub Pages Deployment

1. Push the repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main`) and folder (`/ root`)
4. Save and wait for deployment
5. Access your site at `https://xitrox.github.io/ConflictCost/`

## Project Structure

```
conflict_cost/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── i18n.js            # Internationalization logic
│   └── app.js             # Application logic
├── locales/               # Translation files
│   ├── en.json            # English
│   ├── de.json            # German
│   ├── es.json            # Spanish
│   ├── pt.json            # Portuguese
│   ├── it.json            # Italian
│   ├── pl.json            # Polish
│   ├── bg.json            # Bulgarian
│   ├── hi.json            # Hindi
│   └── kn.json            # Kannada
├── CostCalculation.md     # Original specification
└── README.md              # This file
```

## Usage

1. **Select Language**: Use the language dropdown in the top-right corner
2. **Enter Basic Data**: Fill in conflict ID, parties involved, dates, and responsible person
3. **Enter Direct Costs**: Add salary costs, consultant fees, legal costs, and severance
4. **Enter Indirect Costs**: Add productivity loss, motivation loss, turnover costs, and reputation damage
5. **Add Additional Factors**: Select conflict cause, intensity, solution type, and note long-term effects
6. **Review Totals**: Check the automatically calculated totals in the summary section
7. **Export**: Click "Export as JSON" to save the analysis

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Additional language translations
- Bug fixes
- Feature enhancements
- Documentation improvements

## References

Based on conflict management research from:
- Glasl, F. (2013). *Konfliktmanagement: Ein Handbuch für Führung, Beratung und Mediation.*
- Hocker, J. L., & Wilmot, W. W. (2017). *Interpersonal Conflict.*
- Rüttinger, B., & Sauer, T. (2014). *Kosten von Konflikten in Organisationen.*
- ISO 31000:2018 – *Risikomanagement – Leitlinien.*

## License

MIT License - feel free to use this tool for personal or commercial purposes.

## Author

Created with Claude Code
