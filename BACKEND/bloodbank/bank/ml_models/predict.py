import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

train_df = pd.read_csv('train.csv')

train_df = train_df.dropna()

train_df = pd.get_dummies(train_df)

X_train = train_df.drop('label', axis=1)
y_train = train_df['label']

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

with open('model.pkl', 'wb') as f:
    pickle.dump(clf, f)
