export default function removeTags(str) {
    if ((str===null) || (str==='')) {
        return false;
    }
    else {
        str = str.toString();
        str = str.replace( /(<([^>]+)>)/ig, ''); // remove HTML tags
        str = str.replace(/&quot;/g, '');
        str = str.replace(/amp;/g, '');
        str = str.replace(/&#39;/g, "'");
        str = str.replace(/"/gi, '');
        // str = str.replace(/\r?\n|\r/gi, '');
        return str;
    }
}