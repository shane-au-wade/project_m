// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  words: Array<String>
}

const words_array = ["live", "after","went","great","from","story","up","until","change","she","face","over","paper","got","land","make","here","near","picture","could","need","work","are","three","while","stop","we","earth","any","move","just","keep","still","sentence","has","but","eye","than","hand","along","down","young","air","two","leave","has","had","he","men","far","food","see","last","hard","want","different","must","begin","line","spell","should","it's","year","food","soon","sometimes","his","were","are","three","does","man","these","point","second","run","boy","no","more","life","little","time","on","tell","point","family","sometimes","change","together","get","miss","before","well","of","way","cut","every","the","small","animal","father","group","way","could","me","sentence","keep","follow","say","both","those","sound","find","book","some","earth","often","even","quickly","open","out","good","very","follow","study","off","try","grow","always","back","do","white","mountain","people","earth","home","his","it's","each","all","give","many","America","know","run","him","been","read","air","it","left","begin","call","to","give","near","are","high","white","carry","walk","been","light","word","off","go","such","right","miss","really","all","boy","part","don't","quick","why","young","next","miss","add","city","begin","important","way","thought","try","they","book","big","give","need","say","thing","name","come","under","few","sea","book","make","set","own","car","try","only","every","different","first","is","below","must","new","through","new","also","important","your","long","close","world","thing","we","thought","know","then","come","over","once","keep","around","form","two","end","like","but","these","may","watch","end","city","to","really","long","play","almost","more","add","after","for","open","away","feet","number","some","list","America","car","be","letter","every","go","paper","might","he","those","before","which","help","mother","girl","there","do","live","you","use","water","list","ask","got","think","them","into","point","page","have","about","time","or","often","how","away","different","near","she","her","spell","only","state","never","children","think","night","start","people","seem","cut","city","Indian","in","we","let","through","next","change","tree","will","idea","around","not","took","show","back","much","want","good","before","read","year","mean","day","back","she","made","between","where","turn","other","began","mile","life","good","made","between","along","so","own","tree","had","country","mile","grow","hard","her","about","by","each","small","sound","see","example","often","something","many","house","off","close","both","talk","put","form","mother","three","any","still","Indian","her","soon","found","sch"]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
      words: words_array
  })
}
