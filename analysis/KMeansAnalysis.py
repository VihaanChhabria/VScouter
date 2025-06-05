import pandas as pd
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.cluster import KMeans

import matplotlib.pyplot as plt

home_data = pd.read_csv('analysis/VScouterDataThursdayDistricts.csv', usecols=['teleopCoralPlaceL4Count', 'teleopAlgaePlaceNetShot', 'selectTeam'])
home_data = home_data.groupby('selectTeam').mean().reset_index()
home_data.head()

X_train, X_test = train_test_split(home_data[['teleopCoralPlaceL4Count', 'teleopAlgaePlaceNetShot']], test_size=0.33, random_state=0)
y_train = None  
y_test = None   

X_train_norm = preprocessing.normalize(X_train)
X_test_norm = preprocessing.normalize(X_test)

kmeans = KMeans(n_clusters=3, random_state=0, n_init='auto')
kmeans.fit(X_train_norm)
plt.figure(figsize=(12, 6))
sns.scatterplot(data=X_train, x='teleopCoralPlaceL4Count', y='teleopAlgaePlaceNetShot', hue=kmeans.labels_, legend=False)

for i in range(X_train.shape[0]):
    plt.text(X_train.iloc[i]['teleopCoralPlaceL4Count'], X_train.iloc[i]['teleopAlgaePlaceNetShot'], 
             str(home_data.iloc[X_train.index[i]]['selectTeam']), 
             fontsize=9, ha='right')

plt.title('KMeans Clustering with Team Numbers')
plt.xlabel('teleopCoralPlaceL4Count')
plt.ylabel('teleopAlgaePlaceNetShot')

plt.figure(figsize=(12, 6))
sns.scatterplot(data=home_data, x='teleopCoralPlaceL4Count', y='teleopAlgaePlaceNetShot')

for i in range(home_data.shape[0]):
    plt.text(home_data.iloc[i]['teleopCoralPlaceL4Count'], home_data.iloc[i]['teleopAlgaePlaceNetShot'], 
             str(home_data.iloc[i]['selectTeam']), 
             fontsize=9, ha='right')

plt.title('House Value Distribution with Team Numbers')
plt.xlabel('teleopCoralPlaceL4Count')
plt.ylabel('teleopAlgaePlaceNetShot')

plt.show()
home_data['totalCoralCount'] = home_data[['teleopCoralPlaceL1Count', 'teleopCoralPlaceL2Count', 'teleopCoralPlaceL3Count', 'teleopCoralPlaceL4Count']].sum(axis=1)