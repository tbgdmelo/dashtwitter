import matplotlib.pyplot as plt
from PIL import Image
from wordcloud import WordCloud, ImageColorGenerator

import sys


palavras= sys.argv[1]
wordcloud = WordCloud(background_color="black", width=1600, height=800).generate(palavras)
plt.imshow(wordcloud)
wordcloud.to_file("public/images/nuvem.png")