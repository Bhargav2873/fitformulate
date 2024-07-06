from flask import Flask, request, render_template
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('diet_planner_model.pkl')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            calories = float(request.form['calories'])
            prediction = model.predict(np.array([[calories]]))
            proteins, carbohydrates, fats = prediction[0]

            return render_template('index.html', proteins=proteins, carbohydrates=carbohydrates, fats=fats)
        except ValueError:
            return render_template('index.html', error="Please enter a valid number for calories.")
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
