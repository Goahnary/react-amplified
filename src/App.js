import React, { useState } from 'react';
import logo from './logo.svg';
import PostList from './PostList'
import './App.css';


function App() {
	const [posts, setPosts] = useState([
		{
			"content": "There are more deaths from storms in the summer.",
			"graphImgUrl": "https://i.imgur.com/0jyX3Mx.png",
			"code": "df.groupby('BEGIN_YEARMONTH').agg({'DEATHS_DIRECT':'sum', 'DEATHS_INDIRECT':'sum'}).plot()",
			"number": 1
		},
		{
			"content": "Indirect injuries seem to spike in the winter.",
			"graphImgUrl": "https://i.imgur.com/EmdfTme.png",
			"code": "df.groupby('BEGIN_YEARMONTH').agg({'INJURIES_DIRECT':'sum', 'INJURIES_INDIRECT':'sum'}).plot()",
			"number": 2
		},
		{
			"content": "Property and crop damage seem to be higher in the winter.",
			"graphImgUrl": "https://i.imgur.com/9ejLhCb.png",
			"code": "#Create new columns to work with that are floats\ndf['DAMAGE_CROPS_FLOAT'] = df['DAMAGE_CROPS']\ndf['DAMAGE_PROPERTY_FLOAT'] = df['DAMAGE_PROPERTY']\n\n\n#Create masks for conversion of string to $dollar ammount\ncrops_maskK = df.DAMAGE_CROPS_FLOAT.astype(str).str.contains('K')\ncrops_maskM = df.DAMAGE_CROPS_FLOAT.astype(str).str.contains('M')\ncrops_maskB = df.DAMAGE_CROPS_FLOAT.astype(str).str.contains('B')\nproperty_maskK = df.DAMAGE_PROPERTY.astype(str).str.contains('K')\nproperty_maskM = df.DAMAGE_PROPERTY.astype(str).str.contains('M')\nproperty_maskB = df.DAMAGE_PROPERTY.astype(str).str.contains('B')\n\n#Remove characters denoting $1000, $1000000, and $1000000000\ndf['DAMAGE_CROPS_FLOAT'] = df.DAMAGE_CROPS_FLOAT.astype(str).str.replace(r'[KMB]','').astype(float)\ndf['DAMAGE_CROPS_FLOAT'] = df.DAMAGE_CROPS_FLOAT.mask(crops_maskK, df.DAMAGE_CROPS_FLOAT*1000)\ndf['DAMAGE_CROPS_FLOAT'] = df.DAMAGE_CROPS_FLOAT.mask(crops_maskM, df.DAMAGE_CROPS_FLOAT*1000000)\ndf['DAMAGE_CROPS_FLOAT'] = df.DAMAGE_CROPS_FLOAT.mask(crops_maskB, df.DAMAGE_CROPS_FLOAT*1000000000)\ndf['DAMAGE_PROPERTY_FLOAT'] = df.DAMAGE_PROPERTY_FLOAT.astype(str).str.replace(r'[KMB]','').astype(float)\ndf['DAMAGE_PROPERTY_FLOAT'] = df.DAMAGE_PROPERTY_FLOAT.mask(property_maskK, df.DAMAGE_PROPERTY_FLOAT*1000)\ndf['DAMAGE_PROPERTY_FLOAT'] = df.DAMAGE_PROPERTY_FLOAT.mask(property_maskM, df.DAMAGE_PROPERTY_FLOAT*1000000)\ndf['DAMAGE_PROPERTY_FLOAT'] = df.DAMAGE_PROPERTY_FLOAT.mask(property_maskB, df.DAMAGE_PROPERTY_FLOAT*1000000000)\n#fix NaN issues where there were blanks\ndf['DAMAGE_CROPS_FLOAT'] = df['DAMAGE_CROPS_FLOAT'].fillna(0.0)\ndf['DAMAGE_PROPERTY_FLOAT'] = df['DAMAGE_PROPERTY_FLOAT'].fillna(0.0)\n\ndamage_property_crops = df.groupby('BEGIN_YEARMONTH').agg({'DAMAGE_PROPERTY_FLOAT':'sum', 'DAMAGE_CROPS_FLOAT':'sum'}).plot()",
			"number": 3
		},
		{
			"content": "The most destructive weather events are wildfies based on the highest property damage dollar amount.",
			"graphImgUrl": "https://i.imgur.com/4Ryr9ZW.png",
			"code": "pd.options.display.max_colwidth = 1000\ndf[['EVENT_NARRATIVE','DAMAGE_PROPERTY_FLOAT']].sort_values(by=['DAMAGE_PROPERTY_FLOAT'],ascending=False)",
			"number": 4
		}
	])
  return (
    <div className="App">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header" style={{ 'min-height': '0px', '!important align-items': 'normal', '!important flex-direction': 'initial'}}>
        <img src={logo} className="App-logo" alt="logo" style={{ width: 30, height: 30}}/>
        <p style={{height: 10, 'margin-block-start': 0}}>
          Welcome, Untitled.
        </p>
      </header>
			<h2>Storm Events Data</h2>

			<PostList posts={posts} />

    </div>
  );
}

export default App;
