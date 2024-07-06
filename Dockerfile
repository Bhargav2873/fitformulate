FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app

# Expose port 5000 to the outside world
EXPOSE 5000


# Define the command to run the application
CMD ["gunicorn","--bind", "0.0.0.0:5000", "app:app"]
