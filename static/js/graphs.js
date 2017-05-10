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

    var hairDim = ndx.dimension( function (d) {
        return d["HAIR"];
    })

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

    var genderDim = ndx.dimension(function (d) {
        return d["SEX"];
    });

    var eyeDim = ndx.dimension(function (d) {
        return d['EYE']
    });

    var orientation = ndx.dimension(function (d) {
        return d['GSM']
    });

// METRICS

    var total_of_characters = nameDim.groupAll().reduceCount(function (d) {
        return d["name"]
    });

    var total_Comic = comicDim.group();
    var total_name = nameDim.group();
    var total_id = IdDim.group();
    var total_align = alignDim.group();
    var total_alive = aliveDim.group();
    var total_appearance = nameDim.group().reduceSum(function (d) {
            return d["APPEARANCES"];
        }
    );
    var total_year = yearDim.group();
    var total_gender = genderDim.group();
    var total_hair = hairDim.group();
    var total_eye = eyeDim.group();



// MAX AND MIN YEAR

    var minYear = yearDim.bottom(1)[0]["YEAR"];
    var maxYear = yearDim.top(1)[0]["YEAR"];

 // SELECT MENUS
    selectField = dc.selectMenu("#select_comic")
        .dimension(comicDim)
        .group(total_Comic);

    selectField = dc.selectMenu("#select_gender")
        .dimension(genderDim)
        .group(total_gender);

    selectField = dc.selectMenu("#select_hair")
        .dimension(hairDim)
        .group(total_hair);

    selectField = dc.selectMenu("#select_eye")
        .dimension(eyeDim)
        .group(total_eye);

// CHARTS

     var totalIdChart = dc.rowChart('#identity');
     var totalAliveChart = dc.pieChart('#dead_or_alive');
     var totalCharactersChart = dc.numberDisplay("#total_characters");
     var totalAlignChart = dc.pieChart('#total_align');
     var totalYearChart = dc.lineChart('#year_appearance');
     var rankingNameChart = dc.rowChart('#ranking_names');




 // STYLING CHARTS


    rankingNameChart
        .width(750)
        .height(250)
        .dimension(nameDim)
        .group(total_appearance);
    rankingNameChart.ordering(function (d) { return -d.value});
    rankingNameChart.rowsCap([7]);
    rankingNameChart.othersGrouper(false);


    totalIdChart
        .width(400)
        .height(150)
        .transitionDuration(1500)
        .dimension(IdDim)
        .group(total_id);

    totalAliveChart
        .width(350)
        .height(200)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(aliveDim)
        .group(total_alive);

    totalCharactersChart
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(total_of_characters);

    totalAlignChart
        .width(350)
        .height(250)
        .transitionDuration(1500)
        .dimension(alignDim)
        .group(total_align);



    totalYearChart
        .width(1020)
        .height(280)
        .dimension(yearDim)
        .group(total_year)
        .x(d3.scale.ordinal().domain([(minYear),(maxYear)]))
        .xUnits(dc.units.ordinal)
        .elasticX(true)
        .brushOn(false)
        .renderArea(true)
        .yAxisLabel("Number of characters")
        .colors(["#CA3B67"]);

dc.renderAll();
};

