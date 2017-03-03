queue()
    .defer(d3.json, "/comic_ok/characters_ok")
    .await(makeGraphs);

function makeGraphs(error, projectsJson){

    var comic_characters = projectsJson;
    var dateFormat = d3.time.format("%m/%d/%Y");
    comic_characters.forEach(function (d) {
       d["date_posted"] = dateFormat.parse(d["date_posted"]);
       d["date_posted"].setDate(1);
    });


    var ndx = crossfilter(comic_characters)


    var comicDim = ndx.dimension( function (d) {
        return d["Comic"];
    });

    var nameDim = ndx.dimension( function (d) {
       return d["name"];
    });

    var IdDim = ndx.dimension (function (d) {
        return d["ID"];
    });

    var alignDim = ndx.dimension (function (d) {
        return d["ALIGN"];
    });

    var aliveDim = 

};
