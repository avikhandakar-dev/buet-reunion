export const InvoiceTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt</title>
  <style>
    body {
      margin-top: 5rem;
    }
    .header {
      text-align: center;
    }
    .header h1 {
      line-height: 0;
      text-transform: uppercase;
    }
    .header p {
      font-weight: 600;
      text-transform: uppercase;
    }
    .date {
      display: block;
      margin-left: -8px;
      font-weight: 600;
    }
    .date span {
      font-weight: 400;
    }
    .ucase {
      text-transform: uppercase;
    }
    .primary {
      color: #15ADFF;
    }
    .invoice-box {
      width: 600px;
      max-width: 800px;
      margin: auto;
      padding: 30px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      font-size: 16px;
      line-height: 24px;
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
    }

    .invoice-box table {
      width: 100%;
      line-height: inherit;
      text-align: left;
    }

    .invoice-box table td {
      padding: 5px;
      vertical-align: top;
    }

    .invoice-box table tr td:nth-child(2) {
      text-align: right;
    }

    .invoice-box table tr.top table td {
      padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
      font-size: 45px;
      line-height: 45px;
      color: #333;
    }

    .invoice-box table tr.information table td {
      padding-bottom: 20px;
    }

    .invoice-box table tr.heading td {
      background: #eee;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }

    .invoice-box table tr.details td {
      padding-bottom: 20px;
    }

    .invoice-box table tr.item td {
      border-bottom: 1px solid #eee;
    }

    .invoice-box table tr.item.last td {
      border-bottom: none;
    }

    .invoice-box table tr.total td:nth-child(2) {
      border-top: 2px solid #eee;
      font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
      .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: center;
      }

      .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: center;
      }
    }

    /** RTL **/
    .rtl {
      direction: rtl;
      font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .rtl table {
      text-align: right;
    }

    .rtl table tr td:nth-child(2) {
      text-align: left;
    }
  </style>
</head>

<body>
  <div class="invoice-box">
    <table cellpadding="0" cellspacing="0">
      <tr class="top">
        <td colspan="2">
          <div class="title header">
            <svg width="100px" max-width="300" viewBox="0 0 463 610" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="logo_wot" fill-rule="nonzero">
                        <path d="M214.014443,7.29304331 C214.196995,4.98378167 213.299447,1.47430256 215.794326,0.198131649 C226.275859,-0.090526057 236.772604,-0.044945334 247.254137,0.213327198 C247.634454,2.55297994 248.014771,4.89261141 247.999558,7.27783561 C247.938707,32.6189285 247.938707,57.9600365 247.984346,83.3011445 C236.909518,81.9642036 225.408736,80.8247653 214.531674,84 C214.531674,84 214.440397,32.8468161 214.014443,7.29304331 Z" id="Path" fill="#00324B"></path>
                        <path d="M251,227.550396 C260.092649,224.810201 268.670906,220.586365 276.371669,215 C299.186504,291.498374 322.682153,367.7848 345.678538,444.237757 C351.896639,464.160943 357.600348,484.25066 364,504.11329 C357.312893,504.839972 350.262686,504.628023 344.074843,507.716419 C341.018744,509.366592 338.219842,511.425523 335.118356,513 C309.504619,425.041252 283.134422,337.294452 257.218101,249.426539 C255.16053,242.129445 252.573437,234.968604 251,227.550396 Z" id="Path" fill="#00324B"></path>
                        <path d="M220.68467,104.110872 C232.719613,101.703238 245.574085,103.172046 256.501145,108.880712 C274.166559,117.82984 286.049737,137.408898 284.926678,157.275055 C285.306089,182.95648 263.543028,206.199987 238.076908,208.547051 C212.762552,212.105503 186.886667,194.282957 180.755372,169.646355 C176.126548,152.141799 180.709843,132.078791 193.822315,119.283506 C200.985609,111.682046 210.470905,106.336797 220.68467,104.110872 Z M220.381141,124.992172 C209.378199,129.110891 201.046315,139.392546 199.34655,151.006728 C197.677139,161.772333 201.820315,173.401657 210.076316,180.563989 C218.742082,188.756 232.067025,190.815359 243.191379,187.029772 C260.917498,181.199967 270.387617,159.001283 262.086087,142.269593 C255.469145,126.763827 236.058437,118.874662 220.381141,124.992172 Z" id="Shape" fill="#01324A"></path>
                        <path d="M154.018648,124.666988 C156.866302,123.683177 159.971456,122.018266 162.909993,123.758855 C159.577632,133.808864 155.73027,143.964822 156.184682,154.755867 C155.639387,168.680579 160.456163,181.984732 166,194.516972 C154.064089,200.101992 142.688621,206.822179 132.05536,214.556448 C127.268879,219.414961 121.770483,223.456155 116.93856,228.254126 C102.866909,241.982075 91.9307064,258.646322 83.6906868,276.415464 C78.7527339,287.994164 75.4658144,300.13288 71.6941878,312.074834 C69.8310951,330.948872 68.5738862,350.140756 71.7547761,368.969388 C72.693896,373.071123 73.648163,377.187994 74.2540468,381.365408 C75.6627266,390.14403 79.9947957,398.014519 82.6909786,406.399617 C87.3259896,417.751284 94.1573293,428.043461 101.049257,438.154013 C102.609408,440.167042 102.230731,442.936848 102.07926,445.313131 C99.1558706,457.905913 93.2939449,469.772189 90.8401156,482.486055 C80.4492085,487.571602 70.4975673,493.883129 59.74313,498 C50.9426679,490.492764 45.3230958,480.140044 38.0979315,471.270609 C38.1585199,470.453289 38.2948438,468.84892 38.3554322,468.0316 C45.2170661,459.8584 53.4419386,452.865773 59.4098939,443.950931 C58.1981263,440.999497 56.8045936,438.138877 55.0475306,435.475019 C52.4270832,431.615453 51.5485517,426.862888 48.5797211,423.215219 C37.0982233,424.214166 25.6312667,425.894213 14.0588862,425.107164 C11.6959395,413.467921 7.57350614,401.737866 5.92489635,390.567826 C12.5441768,387.570985 18.9362508,384.120079 25.5403841,381.092968 C28.267467,379.972937 31.0090912,378.868041 33.7507153,377.778281 C32.5662125,368.439643 32.5662125,359.35831 33.1751257,351.397007 C26.9339168,349.701825 20.6781667,348.082321 14.3618281,346.674714 C9.545052,345.706038 4.94033519,343.904907 0.0932648589,343.072452 C-0.224824132,331.175905 0.214441617,319.173409 2.2895936,307.473625 C7.92431286,304.401107 36.1136621,303.644329 36.1136621,303.644329 C37.204253,294.941384 40.1397599,285.950864 41.1424976,277.868478 C33.2660083,271.556951 25.1617067,265.366509 16.6035982,260.008522 C16.103744,254.075384 19.5269875,249.004973 21.7536104,243.798342 C23.7378798,238.849015 26.8581813,234.489975 29.2671753,229.752546 C30.6152667,226.483266 34.7049823,228.10277 37.3557239,228.163313 C45.6411847,230.267155 54.0478223,232.492082 61.8485762,236.033802 L79.2525881,213.951026 C73.9511049,206.655688 69.5584474,198.754928 64.378141,191.383912 C62.939167,189.507103 62.2575477,187.221634 61.8637233,184.92103 C67.256089,179.33601 72.7241902,173.811532 78.7981752,168.968154 C81.9942122,166.243754 85.4023085,160.794954 90.2190847,163.867472 C97.9289559,169.422221 104.942061,175.945645 112.909433,181.182548 C116.226646,182.544748 119.571125,179.396552 121.934072,177.731641 L136.963019,167.394056 C134.706102,156.572134 132.464332,145.720546 130.601239,134.80781 C137.977875,130.494177 146.066423,127.709235 154.018648,124.666988 Z" id="Path" fill="#15ADFF"></path>
                        <path d="M300.019536,123 C302.887336,123.181429 305.997913,122.83369 308.653283,124.254883 C316.103495,127.641555 324.024086,129.939653 331.185999,133.961326 C331.459123,145.13432 327.847819,155.838168 325.951126,166.739018 C330.457669,171.350335 336.951947,173.37629 341.959217,177.428201 C344.402158,178.940108 347.118223,182.538447 350.259147,180.557849 C356.90516,175.598794 363.551174,170.624619 369.969584,165.393421 C372.260789,163.836157 375.523101,160.918176 378.208819,163.412823 C386.159757,169.974499 393.837572,176.914153 400.999486,184.352736 C399.664213,188.67679 397.524743,192.698463 394.884546,196.372397 C390.87873,201.921096 387.768153,208.04432 383.716816,213.56278 C387.844021,220.880411 394.110696,226.701253 398.146859,234.079359 C405.096343,234.653884 411.332671,231.327688 417.948337,229.906496 C422.257624,228.86328 426.460696,227.39673 430.633421,225.899942 C431.99904,227.260658 433.546742,228.545779 434.335767,230.360068 C438.189847,238.116151 442.286705,245.766401 445.715926,253.719032 C446.45943,255.503083 446.231827,257.4988 446.413909,259.388684 C437.780162,264.740835 429.81405,271.181559 421.77207,277.365259 C420.634054,286.225034 426.020663,294.389333 426.536564,303.188632 C438.007765,304.3528 449.645875,304.367919 460.995687,306.650899 C461.830232,318.579846 463.590364,330.478555 462.801339,342.467978 C451.709477,345.612744 440.268623,347.6387 429.571273,352.008111 C429.571273,358.448836 428.357389,375.835767 428.357389,375.835767 C428.357389,375.835767 439.221648,381.278632 443.227465,383.213873 C447.734008,385.602687 452.544022,387.386737 457.065739,389.760431 C457.338863,401.644021 452.422634,412.741419 448.644421,423.77834 C447.840223,424.186555 446.247,425.018104 445.457976,425.441438 C436.930443,424.972747 424.791606,423.46084 414.549462,422.432743 C414.549462,422.432743 405.278426,437.914671 403.123782,443.236584 C408.571085,450.176238 414.83776,456.390176 420.694749,462.951853 C422.060368,464.826617 423.365293,466.761858 424.670218,468.6971 C424.427441,469.362339 423.941887,470.677698 423.699111,471.327818 C418.631146,480.822594 410.831943,488.487963 404.322492,497 C402.365105,496.848809 400.513932,496.34988 398.784148,495.503212 C390.666301,491.436182 382.427065,487.611057 374.415433,483.347479 C372.77669,482.304263 372.260789,480.263189 371.593153,478.600091 C367.981849,467.306145 364.385719,455.99708 360.956497,444.642658 C358.953589,438.020505 365.129222,433.651093 367.951502,428.450133 C373.262243,419.046071 379.210273,409.808319 382.396718,399.406398 C393.185109,372.645643 395.218364,342.951788 391.227722,314.527935 C391.242895,310.279476 389.042731,306.529946 388.253707,302.462916 C382.442239,279.557524 371.820756,257.861658 356.540995,239.76413 C349.379081,232.265071 343.142754,223.81351 334.645568,217.675168 C323.265408,208.014081 310.170638,200.726689 297,193.847512 C297.591768,188.827981 301.825188,185.244761 302.492824,180.164753 C309.260225,161.674129 307.849085,140.931218 300.019536,123 Z" id="Path" fill="#15ADFF"></path>
                        <path d="M158.045335,488 C167.802135,491.825743 178.87241,496.286589 189.085277,498.630423 C198.966736,500.89865 206.981359,502.335194 216.041897,503.287849 C227.851,504.529325 239.90942,504.119532 251.827979,503.544915 C261.58782,502.864446 271.134829,500.39964 280.545018,497.813861 C294.196634,493.836904 297.781323,492.581818 305.08144,489.79946 C307.088137,498.751395 312.728169,514.417282 317,522.567777 C310.70323,525.093069 293.983802,531.308011 293.983802,531.308011 C293.983802,531.308011 292.554791,533.727453 292.068319,534.528893 C292.083522,545.280288 292.524387,556.046805 291.779477,566.767957 C281.058854,568.945455 267.376835,571.213681 254.290743,571.984879 C252.010406,562.140774 247.29771,553.113231 244.242059,543.526193 C244.971767,544.010081 243.527554,543.042304 244.242059,543.526193 C236.428106,542.981818 226.330775,543.238884 219.234368,543.374978 C216.376346,553.113231 212.575785,562.685149 208.486381,572 C195.926287,571.213681 183.904352,569.247885 171.818568,566.813321 C171.438512,556.031683 171.484119,545.234924 171.788164,534.453285 L169.93349,531.262646 C162.48135,528.873447 156.038639,526.529613 149,524.412601 C151.839779,512.239784 154.880228,500.142574 158.045335,488 Z" id="Path" fill="#15ADFF"></path>
                        <path d="M188.261159,217 C196.169868,222.189135 204.745449,226.394907 214,228.558307 C187.340241,318.362119 160.816578,408.211317 134.111453,498 C124.705685,495.382739 115.466256,492.160332 106,489.739744 C106.725847,484.323678 108.812657,479.255572 110.294595,474.03618 C136.288995,388.362496 162.372613,302.703941 188.261159,217 Z" id="Path" fill="#02324B"></path>
                        <path d="M139.814688,284.091667 C142.693974,284.045833 145.588414,284.015278 148.482855,284 C148.467701,287.681944 148.467701,291.348611 148.437392,295.030556 C152.286543,295.045833 156.150849,295.076389 160,295.366667 C158.893748,298.651389 158.302736,302.165278 156.726706,305.281944 C154.150502,306.106944 151.362141,305.480556 148.725321,305.526389 C148.376776,309.345833 148.361622,313.165278 148.467701,317 C145.57326,316.954167 142.67882,316.923611 139.799534,316.923611 C139.844996,313.134722 139.829842,309.361111 139.572222,305.5875 C135.72307,305.755556 131.889073,305.740278 128.055076,305.526389 C128.43393,302.272222 127.357986,298.620833 128.69155,295.611111 C132.267927,294.541667 136.147386,295.290278 139.86015,295.030556 C139.799534,291.379167 139.799534,287.727778 139.814688,284.091667 Z" id="Path" fill="#043146"></path>
                        <path d="M317.468199,284.060795 C320.358308,284.030397 323.26379,284 326.184645,284 C326.230764,287.662872 326.200018,291.340942 326.138526,295.003814 C329.997129,295.019012 333.855732,295.019012 337.714335,294.988615 C338.037167,298.514699 338.067912,302.055982 337.89881,305.582066 C333.94797,305.53647 330.012502,305.53647 326.077034,305.794846 C326.215391,309.457718 326.200018,313.12059 326.123153,316.79866 C323.309909,316.327502 319.651153,318.090544 317.452826,315.765153 C317.345215,312.330261 317.483572,308.88017 317.329842,305.445278 C314.501225,305.475675 311.672608,305.475675 308.84399,305.490874 C307.767886,302.010386 306.799392,298.484302 306,294.927821 C309.827857,295.003814 313.655714,295.04941 317.483572,295.003814 C317.468199,291.340942 317.468199,287.693269 317.468199,284.060795 Z" id="Path" fill="#023248"></path>
                        <path d="M350.226512,514.202065 C360.402466,510.299748 372.784711,516.273295 375.906538,526.704488 C380.063971,537.796073 371.839158,551.184022 360.147317,552.714931 C350.151468,554.531009 339.510242,547.461812 337.574109,537.435859 C335.09766,527.950227 340.876041,517.203847 350.226512,514.202065 Z M352.943102,524.077928 C345.498746,526.914613 345.348658,538.651581 352.702961,541.713399 C359.847141,546.020957 369.287665,537.600957 366.300918,529.991439 C364.800039,524.483169 358.031079,521.586449 352.943102,524.077928 Z" id="Shape" fill="#023248"></path>
                        <path d="M195,305.909522 C195.972285,302.180167 196.762266,298.357966 198.691644,295 C220.917471,295.371388 243.173681,295.294015 265.399507,295.015475 C266.827551,298.512711 267.890987,302.118269 269,305.723828 C244.343461,306.219012 219.671731,305.894047 195,305.909522 Z" id="Path" fill="#043147"></path>
                        <path d="M356,560.465606 C363.594701,561.598597 371.554679,559.816024 376.835964,554 C379.179819,572.626383 380.884442,591.328298 383,610 C377.049042,600.785001 372.39177,590.844888 366.912627,581.357971 C363.412063,574.318317 358.87655,567.792285 356,560.465606 Z" id="Path" fill="#043147"></path>
                        <path d="M84.9999999,371.374263 C90.4540619,370.933255 95.9231904,371.054912 101.377252,371.237398 C101.362186,378.171865 101.332053,385.106331 101.407385,392.056004 C102.311374,391.979969 104.11935,391.827897 105.023338,391.751861 C104.827474,384.847809 104.872673,377.92855 105.038405,371.024498 C108.910487,370.948462 112.78257,371.054912 116.669719,371.267812 C116.534121,378.187072 116.473855,385.106331 116.639586,392.02559 C117.513442,391.979969 119.231019,391.873519 120.104874,391.827897 C120.135007,384.939052 120.135007,378.050207 120.104874,371.176569 C125.393205,371.206984 130.696603,371.085326 136,371.191777 C131.028065,389.409958 125.513737,407.460861 120.135007,425.542178 C115.886263,425.876735 111.54712,426.348157 107.313442,425.603006 C96.134121,409.437792 89.143279,390.565702 84.9999999,371.374263 Z" id="Path" fill="#01151C"></path>
                        <path d="M175.777707,371.395574 C178.581623,371.228216 181.385538,371.182573 184.20461,371.213001 C184.73508,378.211618 184.310704,385.240664 184.522892,392.254495 C185.417114,392.087137 187.190401,391.721992 188.084623,391.554633 C187.781497,384.784232 188.039154,378.013831 187.842122,371.24343 C191.555415,371.152144 195.283865,371.182573 198.997158,371.24343 C198.966845,378.211618 199.012314,385.179806 198.921377,392.163209 C199.861067,392.026279 201.710136,391.75242 202.649826,391.630705 C202.786233,384.84509 202.604357,378.059474 202.695295,371.273859 C206.560151,371.030429 210.440164,371.030429 214.320177,371.289073 C214.320177,378.135546 214.380802,384.982019 214.18377,391.843707 C215.153773,391.843707 217.108936,391.874136 218.078939,391.88935 C217.881907,385.027663 217.957689,378.165975 217.988001,371.304288 C221.686138,371.182573 225.384275,371.167358 229.097569,371.273859 C228.961162,378.150761 229.067256,385.042877 228.961162,391.919779 C229.916009,391.88935 231.79539,391.858921 232.750237,391.828492 C232.61383,384.966805 232.386485,378.089903 232.886643,371.228216 C236.660562,371.228216 240.43448,371.136929 244.223555,371 C244.587306,377.968188 244.481212,384.936376 244.269024,391.904564 C245.860436,391.950207 247.467003,392.011065 249.073571,392.071923 C249.134196,385.134163 249.194821,378.211618 249.028102,371.273859 C252.423113,371.213001 255.818124,371.167358 259.213135,371.410788 C259.000947,378.318119 259.061572,385.22545 259.107041,392.147994 C260.13767,392.041494 262.214083,391.813278 263.259867,391.706777 C263.441743,384.905947 263.320492,378.105118 263.29018,371.304288 C266.836754,371.228216 270.383328,371.197787 273.945058,371.289073 C273.702557,378.135546 273.793495,385.012448 273.808652,391.874136 C275.051468,391.874136 277.521945,391.904564 278.764761,391.919779 C278.598042,385.012448 278.628355,378.120332 278.628355,371.228216 C281.796021,371.121715 284.978844,371.136929 288.161667,371.365145 C293.208715,389.561549 298.998421,407.560166 304,425.771784 C256,426.152144 208,425.665284 160,426 C164.850016,407.681881 170.836754,389.683264 175.777707,371.395574 Z" id="Path" fill="#02151C"></path>
                        <path d="M329,371.309292 C333.809816,370.899779 338.649693,370.914946 343.459509,371.248623 C343.48957,378.119331 343.549693,384.990039 343.369325,391.860746 C344.451534,391.860746 346.615951,391.89108 347.698159,391.89108 C347.547853,385.03554 347.668098,378.164832 347.577914,371.309292 C351.095092,371.127286 354.61227,371.15762 358.144478,371.354793 C357.934049,378.164832 358.129448,384.974871 357.94908,391.800078 C359.031288,391.830412 361.195705,391.906248 362.277914,391.936582 C362.277914,384.974871 362.277914,377.997994 362.247853,371.036283 C367.493558,371.142453 372.739264,371.15762 378,371.400294 C374.272392,389.691847 367.478527,407.316047 357.558282,423.089857 C355.243558,428.110175 348.840491,425.031249 344.631902,425.39526 C339.626687,407.316047 334.12546,389.358171 329,371.309292 Z" id="Path" fill="#02151C"></path>
                        <path d="M98.9999999,510.233374 C100.018149,504.640871 102.159256,499.380895 103.881125,494 C113.209165,497.189238 122.642014,500.076179 132,503.235187 C130.38294,508.480048 128.511343,513.649335 127.193739,519 C117.730944,516.279323 108.522686,512.757557 98.9999999,510.233374 Z" id="Path" fill="#033249"></path>
                        <path d="M91.9999999,528.857143 C93.7224017,523.924812 94.8960738,518.781955 97.0757504,514 C106.266974,517.308271 115.641108,520.06015 125,522.857143 C124.45127,528.135338 122.469746,533.097744 120.533949,538 C111.114088,534.646617 101.496074,531.924812 91.9999999,528.857143 Z" id="Path" fill="#023249"></path>
                        <path d="M90.6666665,535 C99.9999999,538.352124 109.893939,540.148983 119,544.105094 C106.712121,565.908999 94.8787877,587.969599 82.9999999,610 C84.621212,584.934568 87.9999999,559.974834 90.6666665,535 Z" id="Path" fill="#023149"></path>
                    </g>
                </g>
            </svg>
            <h1>Buetian <span class="primary">89</span> NA</h1>
            <p>P.O Box 2751 Santa Clara, CA 95055</p>
          </div>
        </td>
      </tr>

      <tr class="information">
        <td colspan="2">
          <table>
            <tr>
              <td class="date">
               Date of Donation : <span>{{date}}</span><br>
               Receipt ID : <span class="ucase">{{id}}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr class="heading">
        <td>
          Payment Details
        </td>

        <td>
          
        </td>
      </tr>

      <tr class="item">
        <td>
          Donated By
        </td>

        <td>
          {{donorName}}
        </td>
      </tr>
      <tr class="item">
        <td>
          Donor Email
        </td>
        <td>
          {{donorEmail}}
        </td>
      </tr>
      <tr class="details">
        <td>
          Payment Method
        </td>
        <td>
          {{paymentMethod}}
        </td>
      </tr>

      <tr class="heading">
        <td>
          Project
        </td>

        <td>
          Amount
        </td>
      </tr>

      <tr class="item last">
        <td>
          {{projectTitle}}
        </td>

        <td>
          \${{ amount }}
        </td>
      </tr>

      <tr class="total">
        <td></td>

        <td>
          Total: \${{ amount }}
        </td>
      </tr>
    </table>
  </div>
</body>

</html>
`;