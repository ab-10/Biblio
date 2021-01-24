import re

from api.models import Topic

def run():
    chapters = {}
    textbook = open('pdfmine/economics.txt').readlines()

    exp = re.compile(r"Chapter \d+ \| ((\w+ ?)+)")
    exc = re.compile(r"\d+\.")

    txt = ""
    curr_chapt = None

    exercises = []
    for i, line in enumerate(textbook):
        if exc.match(line) is not None:
            line = re.sub(r"((\d+).?)+", "", line)
            q = line
            j = i
            while j < len(textbook) and textbook[j] != '\n' and exc.match(textbook[j]) is None:
                q += textbook[j]
                j+= 1
            if len(q) > 2 and q[-2] == '?':
                exercises.append(q)

    for line in textbook:

        if exp.match(line) is not None:
            if curr_chapt is not None:
                chapters[curr_chapt] = txt
                txt = ""
            curr_chapt = exp.match(line).group(1)
        else:
            txt += line

    exercises_per_chapt = int(len(exercises) / len(chapters))

    for i, chapter in enumerate(chapters):
        if len(chapter) > 30:
            continue

        curr_ex = exercises[i*exercises_per_chapt:(i+1)*exercises_per_chapt]

        if len(curr_ex):
            full_text = chapters[chapter]
            topic = Topic(topic=chapter, explanation=full_text[:100], full_text=full_text, exercises=curr_ex)
            topic.save()
