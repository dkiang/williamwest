from flask import Flask, render_template, jsonify, request
from generate_couplets import generate_couplets, LineProcessor
import pandas as pd

app = Flask(__name__)

# Initialize the line processor once
processor = LineProcessor()

# Load the data once at startup
def load_data():
    kanye_df = pd.read_csv('lyrics/kanye_west.csv')
    shakespeare_df = pd.read_csv('lyrics/shakespeare_sonnets.csv')
    return kanye_df['lyric_line'].tolist(), shakespeare_df['sonnet_line'].tolist()

KANYE_LINES, SHAKESPEARE_LINES = load_data()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    try:
        num_couplets = int(request.json.get('num_couplets', 5))
        num_couplets = min(max(1, num_couplets), 10)  # Limit between 1 and 10
        
        couplets = generate_couplets(
            KANYE_LINES, 
            SHAKESPEARE_LINES, 
            num_couplets=num_couplets
        )
        
        return jsonify({
            'success': True,
            'couplets': [{'line1': line1, 'line2': line2} for line1, line2 in couplets]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 