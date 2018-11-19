import codecs

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning

from urllib.request import Request, urlopen
import urllib.parse
from goose3 import Goose
from bs4 import BeautifulSoup, SoupStrainer
import sys

section_dict = {}
g=Goose()

OUTPUTFILE="Phone_Scam.txt"

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

def get_urls(main_url):

    hdr = {'User-Agent': 'Mozilla/5.0', 'referer' : main_url}
    try:
        html = requests.get(main_url, verify = False)
    except requests.ConnectionError as e:
          print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
          #renewIPadress()
          html = "space"
          print(html)
          print(str(e))
    except requests.Timeout as e:
          print("OOPS!! Timeout Error")
          html = "space"
          print(str(e))
          #renewIPadress()
    except requests.RequestException as e:
          print("OOPS!! General Error")
          html = "space"
          print(str(e))
          #renewIPadress()
    except KeyboardInterrupt:
          html = "space"
          print("Someone closed the program")

    #html = Request(main_url,headers = hdr)

    #resp = urllib2.Request(main_url, headers=hdr)
    #html = urllib2.urlopen(resp)
    #html_doc = html.read()
    if html == "space":
        print("html is space")
    else :
        html_doc = html.text
        soup = BeautifulSoup(html_doc, 'html.parser')
        sections = soup.find_all('section')
        get_main_text(main_url)

    #html_doc = urlopen(html).read()

    #html.close()

def get_main_text(main_url):
    article = g.extract(url=main_url)
    with open(OUTPUTFILE, mode = 'a', encoding = 'UTF-8') as ut:
        #ut = UTF8Writer(ut)
        ut.write('\n###########################################################################################' + "\n")
        #ut.write("\n")
        ut.write(article.cleaned_text)

def main():
    for x in range(27):
        page_number = (x*10)
        url = 'https://www.google.co.kr/search?q=Phone+Scam&tbm=nws&ei=qOPtW6XKJYSS8wXokYGwDg&start='+str(page_number)

        print("page_number : ",page_number)
        hdr = {'User-Agent' : 'Mozilla/5.0', 'referer' : url}
        try:
            html = requests.get(url, verify = False)
        except requests.ConnectionError as e:
              print("OOPS!! Connection Error. Make sure you are connected to Internet. Technical Details given below.\n")
              renewIPadress()
              print(str(e))
              continue
        except requests.Timeout as e:
              print("OOPS!! Timeout Error")
              print(str(e))
              renewIPadress()
              continue
        except requests.RequestException as e:
              print("OOPS!! General Error")
              print(str(e))
              renewIPadress()
              continue
        except KeyboardInterrupt:
                print("Someone closed the program")

        #html = Request(url,headers = hdr)
        #req = urllib2.Request(url, headers=hdr)
        #html = urllib2.urlopen(req)
        #source = html.read()

        source = html.text

        #source = urlopen(html).read()

        #html.close()

        soup = BeautifulSoup(source, "html.parser")

        for a in soup.select('.r a'):
            get_urls(urllib.parse.parse_qs(urllib.parse.urlparse(a['href']).query)['q'][0])

if __name__ == '__main__':
    main()
