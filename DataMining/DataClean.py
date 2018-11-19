import re
import os

#Phone_Scam.txt

def clean_str(string):
	"""Clean sentence"""
	string = re.sub(r"[^A-Za-z0-9(),!?\'\`]", " ", string)
    string = re.sub(r"\'s", " \'s", string)
    string = re.sub(r"\'ve", " \'ve", string)
    string = re.sub(r"n\'t", " n\'t", string)
    string = re.sub(r"\'re", " \'re", string)
    string = re.sub(r"\'d", " \'d", string)
    string = re.sub(r"\'ll", " \'ll", string)
    string = re.sub(r",", " , ", string)
    string = re.sub(r"!", " ! ", string)
    string = re.sub(r"\(", " \( ", string)
    string = re.sub(r"\)", " \) ", string)
    string = re.sub(r"\?", " \? ", string)
    string = re.sub(r"\s{2,}", " ", string)
	return s.strip().lower()


file_path = "C:/Users/Seyoung/Desktop/Fishing_Phishing_fork/Fishing_Phishing_Server/DataMining/RawData/Phone_Scam.txt"

with open(file_path, 'rb') as f:
    contents = f.read()
    contents = "".join(map(chr, contents))

file_save_path = "C:/Users/Seyoung/Desktop/Fishing_Phishing_fork/Fishing_Phishing_Server/DataMining/RefinedData/"
save_file = open(file_save_path+"Phone_Scam(Clean).txt", mode = 'w', encoding = 'utf-8')
save_file.write(clean_str(contents)+"\n")
save_file.close()
