queue()
    .defer(d3.json, '/comic_ok/characters_ok')
    .await(makeGraphs);

function makeGraphs(error, projectsJson){

 // CLEAN JSON

    var comic_characters = projectsJson;

// CROSSFILTER

    var ndx = crossfilter(comic_characters);

// DIMENSIONS

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
    var aliveDim = ndx.dimension (function (d) {
        return d["ALIVE"];
    });
    var appearanceDim = ndx.dimension (function (d) {
        return d["APPEARANCES"];
    });
    var yearDim = ndx.dimension (function (d) {
        return d["YEAR"];
    });


// METRICS

    var total_of_characters = comicDim.groupAll().reduceCount(function (d) {
        return d["Comic"];
    });

    var totalComic = comicDim.group();

    var totalAlign = alignDim.group().reduceCount(function (d) {
        return d['ALIGN']
    });

// CHARTS


     var totalCharactersChart = dc.numberDisplay("#total_characters");
     var totalAlignChart = dc.pieChart('#total_align');

 // STYLING CHARTS

selectField = dc.selectMenu("#select_comic")
    .dimension(comicDim)
    .group(totalComic)


totalCharactersChart
    .formatNumber(d3.format("d"))
    .valueAccessor(function (d) {
        return d;
    })
    .group(total_of_characters);

totalAlignChart
    .width(300)
    .height(150)
    .innerRadius(20)
    .transitionDuration(1500)
    .dimension(alignDim)
    .group(totalAlign);

dc.renderAll();
};

