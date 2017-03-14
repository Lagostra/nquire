package nquire.similarity;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;

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
        return new ArrayList<String>(new LinkedHashSet<String>(s));
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

        try(BufferedReader reader = new BufferedReader(new FileReader("stopwords_no.txt"))) {
            String line;
            while((line = reader.readLine()) != null) {
                result.add(line);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        try(BufferedReader reader = new BufferedReader(new FileReader("stopwords_en.txt"))) {
            String line;
            while((line = reader.readLine()) != null) {
                result.add(line);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        stopWords = result;
    }

}
