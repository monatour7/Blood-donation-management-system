import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load the training data from the correct file path
train_df = pd.read_csv('train.csv')

# Data preprocessing steps

# Handle missing values (replace with appropriate strategy)
train_df = train_df.dropna()

# Encode categorical variables (if applicable)
train_df = pd.get_dummies(train_df)

# Split the data into features and labels
X_train = train_df.drop('label', axis=1)
y_train = train_df['label']

# Train a random forest classifier
clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

# Save the model to the correct file path using pickle
with open('model.pkl', 'wb') as f:
    pickle.dump(clf, f)
