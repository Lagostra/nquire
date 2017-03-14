package nquire.similarity;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.*;
import java.util.*;

public class WordCounter implements SimilarityCalculator{

    List<String> stopWords;
    private static Log log = LogFactory.getLog(WordCounter.class);
    private int nGrams;

    public WordCounter(int nGrams) {
        this.nGrams = nGrams;
        loadStopWords();
    }

    @Override
    public float calculate(String s1, String s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        List<String> l1 = listify(s1);
        List<String> l2 = listify(s2);

        if(nGrams > 1) {
            makeNGrams(l1, nGrams);
            makeNGrams(l2, nGrams);
        }

        l1 = removeDuplicates(l1);
        l2 = removeDuplicates(l2);

        removeStopWords(l1);
        removeStopWords(l2);

        return calculateSimilarity(l1, l2);
    }

    List<String> listify(String s) {
        return new ArrayList<String>(Arrays.asList(s.split(" ")));
    }

    void makeNGrams(List<String> s, int n) {
        if(n < 2)
            return;

        int length = s.size();

        for(int i = 1; i < n; i++) {
            for(int j = 0; j < length - i; j++) {
                String nGram = s.get(j);
                for(int k = 1; k <= i; k++) {
                    nGram += "_" + s.get(j + k);
                }
                s.add(nGram);
            }
        }
    }

    void removeStopWords(List<String> s) {
        for(int i = 0; i < s.size(); i++) {
            if(stopWords.contains(s.get(i))) {
                s.remove(i);
                i--;
            }
        }
    }

    List<String> removeDuplicates(List<String> s) {
        return new ArrayList<>(new LinkedHashSet<>(s));
    }

    float calculateSimilarity(List<String> s1, List<String> s2) {
        int numSimilarWords = 0;
        for(String w : s1) {
            if(s2.contains(w))
                numSimilarWords++;
        }
        return (float) numSimilarWords / Math.max(s1.size(), s2.size());
    }

    private void loadStopWords() {
        List<String> result = new ArrayList<>();

        result.addAll(Arrays.asList("a","about","above","across","after","afterwards","again","against","all","almost","alone","along","already","also","although","always","am","among","amongst","amoungst","amount","an","and","another","any","anyhow","anyone","anything","anyway","anywhere","are","around","as","at","back","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","below","beside","besides","between","beyond","bill","both","bottom","but","by","call","can","cannot","cant","co","computer","con","could","couldnt","cry","de","describe","detail","do","done","down","due","during","each","eg","eight","either","eleven","else","elsewhere","empty","enough","etc","even","ever","every","everyone","everything","everywhere","except","few","fifteen","fify","fill","find","fire","first","five","for","former","formerly","forty","found","four","from","front","full","further","get","give","go","had","has","hasnt","have","he","hence","her","here","hereafter","hereby","herein","hereupon","hers","herse"","him","himse"","his","how","however","hundred","i","ie","if","in","inc","indeed","interest","into","is","it","its","itse"","keep","last","latter","latterly","least","less","ltd","made","many","may","me","meanwhile","might","mill","mine","more","moreover","most","mostly","move","much","must","my","myse"","name","namely","neither","never","nevertheless","next","nine","no","nobody","none","noone","nor","not","nothing","now","nowhere","of","off","often","on","once","one","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","own","part","per","perhaps","please","put","rather","re","same","see","seem","seemed","seeming","seems","serious","several","she","should","show","side","since","sincere","six","sixty","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","system","take","ten","than","that","the","their","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","thereupon","these","they","thick","thin","third","this","those","though","three","through","throughout","thru","thus","to","together","too","top","toward","towards","twelve","twenty","two","un","under","until","up","upon","us","very","via","was","we","well","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves","alle","andre","at","av","bare","begge","ble","bli","blir","blitt","bort","bra","bruke","bÃ¥de","da","de","deg","dem","den","denne","der","dere","deres","det","dette","din","disse","dit","ditt","du","eller","en","ene","eneste","enhver","enn","er","et","ett","etter","for","fordi","forsÃ¸ke","fra","fram","fÃ¸r","fÃ¸rst","fÃ¥","gjorde","gjÃ¸re","god","gÃ¥","ha","hadde","han","hans","har","hennar","henne","hennes","her","hit","hun","hva","hvem","hver","hvilke","hvilken","hvis","hvor","hvordan","hvorfor","i","ikke","ingen","inn","innen","inni","ja","jeg","kan","kom","kun","kunne","lage","lang","lik","like","man","mange","med","meg","meget","mellom","men","mens","mer","mest","min","min","mitt","mot","mye","mÃ¥","mÃ¥te","ned","nei","noe","noen","ny","nÃ¥","nÃ¥r","og","ogsÃ¥","om","opp","oss","over","pÃ¥","rett","riktig","samme","seg","selv","si","siden","sin","sine","sist","sitt","sjÃ¸l","skal","skulle","slik","slutt","som","start","stille","sÃ¥","sÃ¥nn","tid","til","tilbake","under","ut","uten","var","ved","verdi","vi","vil","ville","vite","vÃ¦re","vÃ¦rt","vÃ¥r","Ã¥","blei","bÃ¥e","dei","deim","deira","deires","di","dykk","dykkar","dÃ¥","eg","ein","eit","eitt","elles","hjÃ¥","ho","hoe","honom","hoss","hossen","ikkje","ingi","inkje","korleis","korso","kva","kvar","kvarhelst","kven","kvi","kvifor","me","medan","mi","mine","mykje","no","noka","noko","nokon","nokor","nokre","si","sia","sidan","so","somme","somt","um","upp","vart","varte","vere","verte","vore","vors","vort"));

        /*
        try(Scanner scanner = new Scanner(this.class.classLoader.getResource("nquire/similarity/stopwords_no.txt").file.openStream()) {
            String line;
            while((line = scanner.nextLine()) != null) {
                result.add(line);
            }
        }

        try(Scanner scanner = new Scanner(WordCounter.class.getResourceAsStream("nquire/similarity/stopwords_en.txt"))) {
            String line;
            while((line = scanner.nextLine()) != null) {
                result.add(line);
            }
        }*/

        stopWords = result;
    }
}
