import globalAudio from './globalAudio'

export default function sketch (p) {
    let t = 0; // time variable
    let inOut = false;
    let numPoints = 0;
    let stepTime = 0;
    let travelTime = 0.05;
    //let totalTime = 1.5;
    let totalTime = 1.5;
    //let waitTime = 0.5;
    let waitTime = 0.2;

    let scalar = 1;
    // use rotscale to scale rotation speed and also to increase blur
    let rotscalar = 1.00001;
    let rotscalemax = 50;
    let rotscalemin = 1.00001;
    let increasingrotscalar = true;
    // Scalar when volume max
    let max_scalar = 1.5;

    // smoothing limit between 0 to 128 for how much a volume can change at a time
    let smoothing_limit = 128;

    let maxdiff = 0;
    let lastmaxdiff = 0;



    //let wave = 0.5;
    let wave = 5;
    let rot = 0;

    let red1 = p.color(255, 35, 79);
    let red2 = p.color(255, 126, 27);
    let green1 = p.color(20, 209, 190);
    let green2 = p.color(0, 102, 204);
    let dark = p.color(30, 200, 0);

    let data = [
        [186.45374761586316, 1.6405753250593413],
        [187.2591786802452, 1.415304943526301],
        [179.4017837146554, 1.6377352729044887],
        [179.7470444819608, 1.4312596139915073],
        [173.07223925286226, 1.5996900176249742],
        [173.40126873814967, 1.4435801097270087],
        [171.14321488157222, 1.5298834970194573],
        [177.55280904564702, 1.2080705024613843],
        [167.72000476985446, 1.8548289287246744],
        [167.50522379914005, 1.6484839687244428],
        [166.20770138594662, 1.4076258861666715],
        [171.81676286090365, 1.2140692504096942],
        [157.49285698088025, 1.8804992713373527],
        [159.80300372646317, 1.6710876442118137],
        [155.72411502397438, 1.3834759927691556],
        [163.41358572652396, 1.194835372923591],
        [146.75149062275312, 1.875307209997009],
        [153.16984037335808, 1.7745938478372247],
        [151.19854496654392, 1.696792008958909],
        [143.50261321662404, 1.6545162623224392],
        [141.56623891309678, 1.4219063791853994],
        [147.29901561110313, 1.3587546771186347],
        [154.53802121160993, 1.302274133984156],
        [158.14550262337528, 1.229048438425104],
        [164.58432489152787, 1.1180178549713606],
        [151.3968295572929, 1.9782900152743441],
        [149.0, 1.9201407248113758],
        [154.02921800749363, 1.9850655023111856],
        [160.25604512778918, 1.9478264722551133],
        [169.81460479004744, 1.8944090764319037],
        [174.72263734273244, 1.8490959858000078],
        [177.89041570584965, 1.7803191862400685],
        [183.63550854886427, 1.7404212500513563],
        [187.0721785835617, 1.6779116501471283],
        [189.12958520548815, 1.6078164426688266],
        [190.0026315607234, 1.5655332174973013],
        [190.31815467789718, 1.5129661440493036],
        [191.2694434560837, 1.4555202008239445],
        [191.23022773609824, 1.3867333102391615],
        [187.2431574183687, 1.3335895279112526],
        [182.48561587149823, 1.2646424278942285],
        [180.13605968822566, 1.2016296697877213],
        [175.55910685578235, 1.1606689862534056],
        [170.0, 1.1334584350470127],
        [159.38946012832844, 1.059432156623865],
        [152.85614151874958, 1.0045688653757958],
        [144.138821973818, 1.0636978224025597],
        [132.83448347473634, 1.0936815185467212],
        [123.48279232346505, 1.1361261116456518],
        [119.97082978791136, 1.204220936950718],
        [124.61942063739504, 1.2693475512574728],
        [131.21737689803132, 1.316575782623213],
        [137.31715115017496, 1.3505476034042077],
        [134.6291201783626, 1.4740840588908595],
        [134.05968819895114, 1.5409544421277872],
        [135.05924625881784, 1.6004172902240226],
        [136.13228860193308, 1.6148853841929682],
        [150.72159765607583, 2.0463128146419614],
        [143.75673897247393, 2.087354008513366],
        [139.2838827718412, 2.1309177109782897],
        [133.13526955694348, 2.1692152202734336],
        [125.80143083447024, 2.2095279963951517],
        [141.98943622678414, 1.8858654661390664],
        [127.22421153223941, 1.9323268796625654],
        [116.37869220780924, 1.903416018368809],
        [134.73678042761748, 1.9113240167839713],
        [116.66190466471906, 1.8220119152869605],
        [116.55899793666725, 1.7345345679092556],
        [120.59850745345068, 1.6704649792860586],
        [122.20065466273084, 1.6281105359009365],
        [126.09916732476864, 1.610458056718024],
        [115.10864433221339, 1.6142472221864272],
        [107.0420478129973, 1.5427662868350502],
        [105.80170130957252, 1.4476136646536204],
        [106.30145812734649, 1.3623311084149088],
        [112.08925015361643, 1.299849476456476],
        [120.81390648431164, 1.233340257567115],
        [105.6882207249228, 1.9284595778061027],
        [91.54780172128658, 1.9513027039072615],
        [87.80091115700337, 1.8240620930256493],
        [87.13208364316786, 1.7321714372155879],
        [93.08598175880189, 1.6137805866626675],
        [100.0, 1.5707963267948966],
        [96.42095207992918, 1.477319545636307],
        [98.48857801796105, 1.3455195475808412],
        [87.28115489611719, 1.2562920223781515],
        [82.0792300158816, 1.1835027235888202],
        [82.365041127896, 1.0636978224025597],
        [137.87675656179326, 0.9606645394005293],
        [74.43117626371358, 1.6784861976277172],
        [65.03076195155643, 1.6015558528653657],
        [56.142675390472796, 1.4994888620096063],
        [60.41522986797286, 1.3539227111284884],
        [66.73080248281148, 1.2348287208687656],
        [75.02666192761077, 1.202665555469733],
        [71.8679344353238, 2.127920716954292],
        [61.85466837676846, 2.1722510336551695],
        [52.69724850502159, 2.1535358210448687],
        [46.51881339845203, 2.0152155366959956],
        [44.384682042344295, 1.8212394164062484],
        [52.009614495783374, 1.5900247258946036],
        [81.39410298049853, 2.028949485592486],
        [51.62363799656123, 1.415201498817867],
        [42.5440947723653, 1.1597317794050324],
        [43.60045871318328, 0.9318823417910096],
        [50.93132631298737, 0.7576275268040272],
        [58.728187440104094, 0.7492693128846728],
        [49.8196748283246, 3.323241483589805],
        [43.01162633521314, 3.448638385608584],
        [33.12099032335839, 3.6457586150689463],
        [18.384776310850235, 3.9269908169872414],
        [12.36931687685298, 4.4674103172578254],
        [13.601470508735444, -0.9420000403794636],
        [22.825424421026653, -0.5028432109278609],
        [36.40054944640259, -0.36520144978817304],
        [51.92301994298868, -0.2730087030867106],
        [58.249463516842795, -0.20749622643520266],
        [67.11929677819934, -0.05963071313116939],
        [23.769728648009426, 3.529911371762259],
        [12.649110640673518, 2.819842099193151],
        [4.0, 1.5707963267948966],
        [14.422205101855956, 0.982793723247329],
        [20.0, 0.9272952180016122],
        [37.8021163428716, 0.9167136023805363],
        [15.297058540778355, 1.7681918866447772],
        [21.540659228538015, 1.9513027039072615],
        [33.1058907144937, 2.0074234866084377],
        [29.017236257093817, 0.034469100999508014],
        [39.6232255123179, 0.1775961672834879],
        [47.75981574503821, 0.34161549064780716],
        [59.21148537234985, 0.08454375551299813],
        [46.87216658103186, 0.5880026035475675],
        [45.18849411078001, 2.7076392841958965],
        [38.41874542459709, 2.4668517113662403],
        [40.607881008493905, 2.23399931950099],
        [30.265491900843113, 3.2741441858864673],
        [34.0, 3.141592653589793],
        [39.6232255123179, 2.9639964863063053],
        [28.0178514522438, 4.104586984270729],
        [35.0, 4.068887871591405],
        [43.86342439892262, 3.9592376994224954],
        [52.40229002629561, 3.872989316611273],
        [60.30754513325841, 3.8448232946255416],
        [66.84309986827361, 3.8210064589976414],
        [77.62087348130012, 3.8082854798440646],
        [72.18032973047436, 3.8877952150601867],
        [54.48853090330111, 3.9659321600842805],
        [41.773197148410844, 3.977794521045463],
        [29.206163733020468, 3.8056388164164776],
        [36.05551275463989, -0.5880026035475675],
        [53.53503525729669, -0.5724598138180512],
        [30.4138126514911, -0.7621465405869854],
        [41.10960958218893, -0.7165416740964037],
        [53.150729063673246, -0.7188299996216245],
        [70.60453243241541, -0.6548320685978206],
        [23.769728648009426, -1.1824776086224307],
        [36.61966684720111, -0.960070362405688],
        [48.91829923454004, -0.8577354939360433],
        [61.5223536610881, -0.7968919101124788],
        [77.79460135510689, -0.7672183483244701],
        [82.20097323024831, -0.6386349671539848],
        [28.0178514522438, -1.5350972141155728],
        [40.024992192379, 4.485590132330804],
        [47.75981574503821, 4.370773489736883],
        [55.90169943749474, 4.2487413713838835],
        [63.28506932918696, 4.163839577934162],
        [77.20103626247513, 4.074069172375644],
        [86.55634003352961, 4.008775197605237],
        [92.69843580125827, 3.965140237858224],
        [35.73513677041127, -1.2578950989145121],
        [48.30113870293329, -1.0978897231319673],
        [66.03786792439622, -1.0121970114513341],
        [81.27115109311545, -0.9691426941365711],
        [95.69221493935649, -0.9712000398258789],
        [112.61438629233834, -0.9113107890832465],
        [50.00999900019995, -1.3694792184202558],
        [56.08029957123981, -1.5172760583355815],
        [63.0317380372777, 4.680653606856232],
        [69.72087205421343, 4.568463530996473],
        [79.07591289387686, 4.482746538099555],
        [85.72630868059116, 4.416462941920481],
        [98.43271813782245, 4.3488621034102515],
        [108.46197490364999, 4.31476098886256],
        [136.0, 4.222431654130961],
        [50.21951811795888, 4.491560210655342],
        [66.12866246946176, 4.357158118338008],
        [71.58910531638176, 4.279981204814152],
        [86.35392289873113, 4.217663297900441],
        [94.03190947758107, 4.139134569991717],
        [109.288608738514, 4.109159127460005],
        [61.39218191268331, -1.3574276846430886],
        [71.84010022264724, -1.2886725946521813],
        [79.05694150420949, -1.2490457723982544],
        [94.54099639838793, -1.168682311143134],
        [103.31021246711285, -1.0984909254643433],
        [112.29425630903836, -1.079267498429916],
        [71.449282711585, -1.4585935117976423],
        [80.00624975587844, -1.5582969777755349],
        [91.13725912051558, 4.657499117790536],
        [97.73944955850733, 4.589303020689684],
        [104.39348638684312, 4.548815104817831],
        [136.12494260788506, 4.437116557339051],
        [148.66068747318505, 4.411911812012109],
        [162.22515218054195, 4.392587741257813],
        [160.63934760823702, 4.282155114433076],
        [153.52198539622916, 4.289535054251749],
        [142.86357128393507, 4.3019825441206105],
        [137.23337786413333, 4.32376370182943],
        [80.62257748298549, -1.446441332248135],
        [94.72592042308166, -1.379611867197882],
        [105.26157893552613, -1.3212094013579119],
        [112.08925015361643, -1.299849476456476],
        [138.2208377922808, -1.2696378270112938],
        [148.66068747318505, -1.2277723863741932],
        [95.42536350467836, -1.47634139139985],
        [107.78682665335315, -1.4498935624922051],
        [139.83204210766573, -1.3691932181420534],
        [150.02999700059985, -1.3694792184202558],
        [165.89454481688057, -1.3272796509305047],
        [179.53551180755298, -1.3001476279085835],
        [191.3765920900464, -1.273834082435554],
        [201.45719148245863, -1.263173560795142],
        [217.60974242896387, -1.2286997431408113],
        [139.60659010233005, 4.6191350652799095],
        [145.0, 4.594877334953244],
        [156.1793840428371, 4.545135042922428],
        [163.5726138447387, 4.503003587431194],
        [170.51979357247652, 4.481634109012303],
        [180.6931099959265, 4.460699008626503],
        [189.70766985021982, 4.445674610416033],
        [143.58969322343438, -1.4801364395941514],
        [159.38946012832844, -1.4386593881726437],
        [173.44163283364233, -1.402804055149021],
        [185.9247159470736, -1.3649621486907715],
        [193.3959668659096, -1.357175010513875],
        [206.42189806316577, -1.3410926212616612],
        [221.20578654275752, -1.3148531907902146],
        [146.08559134972896, -1.5365631304855158],
        [153.0294089382822, -1.551190995937692],
        [164.0762018087937, 4.681910616443644],
        [177.22866585290316, 4.661585276326468],
        [184.53184007102948, 4.636448344118795],
        [196.73586353280888, 4.625870809032316],
        [209.16022566444127, 4.607011541195748],
        [224.75097330156325, 4.587482109514266],
        [167.19150696132863, -1.5229287285042514],
        [182.33211456021672, -1.5104301995129266],
        [190.7590102721232, -1.4815602639760803],
        [204.70710783946902, -1.4876550949064553],
        [192.16659439142902, -1.5291537476963082],
        [204.0392119177096, -1.551190995937692],
        [210.00952359357422, 4.702865458791077],
        [224.1807306616695, 4.67223200836402],
        [231.10603626906848, -1.5405025668761214],
        [220.11133546457802, -1.5389888759997334],
        [212.11553455605272, -1.5377894505859158],
        [110.11357772772621, 2.168874156166604],
        [107.37783756436893, 2.1303828086489895],
        [101.35580891098448, 2.109523781302942],
        [93.49331526906082, 2.1350645156528283],
        [85.44588931013593, 2.181522291184105],
        [78.24321056807422, 2.247533274351757],
        [72.91776189653656, 2.3076888779519615],
        [67.26812023536856, 2.4087775518032863],
        [61.220911460055866, 2.4719537079131557],
        [58.309518948453004, 2.601173153319209],
        [54.12947441089743, 2.702733354626287],
        [52.49761899362675, 2.8318897090473367],
        [53.75872022286245, 2.973385881732707],
        [53.03772242470448, 3.103874701122929],
        [57.07889277132134, 3.1941757152007346],
        [60.530983801686226, 3.2741441858864673],
        [62.81719509815764, 3.3827103320412615],
        [70.83078426785913, 3.369449702306893],
        [76.90253571892151, 3.364492885918169],
        [80.89499366462674, 3.2904826011992903],
        [87.69264507357501, 3.267362074350321],
        [89.20201791439474, 3.208906529382498],
        [89.05054744357274, 3.107897546243777],
        [89.94442728707543, 2.9965509552631877],
        [90.24411338142782, 2.91811605244916],
        [92.65527507918802, 2.8232550552246893],
        [94.70480452437458, 2.7630470582782998],
        [97.06183596038146, 2.659513952194888],
        [99.64436762808022, 2.5925675137821966],
        [103.22790320451152, 2.5213431676069717],
        [109.34349546269316, 2.4468543773930898],
        [114.6298390472568, 2.393214606066275],
        [120.96693763173474, 2.3269630528201244],
        [119.85407794480753, 2.279422598922567],
        [117.64352935882194, 2.1870932641909677],
        [76.6550715869472, 3.2724200496638502],
        [73.00684899377592, 3.1278948802169273],
        [73.24616030891995, 3.0595852080636075],
        [75.69015788066504, 2.8741818564059196],
        [79.7057087039567, 2.728463821311392],
        [82.85529554590944, 2.623943544213019],
        [85.14693182963201, 2.5568473675122316],
        [90.27181176868004, 2.4582014081024566],
        [94.17536832951598, 2.4087775518032863],
        [100.41912168506553, 2.342110914369485],
        [106.4048871058092, 2.2763645044801075],
        [111.04053313993049, 2.241317884775446],
        [94.13288479590966, 3.0884512447448578],
        [102.12247548899312, 3.0926122526660658],
        [102.70345661174214, 3.024483909022929],
        [104.546640309481, 2.880374118975258],
        [107.56393447619885, 2.790438810989146],
        [110.16805344563369, 2.730741462288008],
        [114.06138698087096, 2.6583397137317823],
        [121.2023102090055, 2.5558783755674463],
        [124.61942063739504, 2.5157462111256046],
        [118.69709347747316, 2.4576414454918285],
        [109.4440496326776, 2.9298611583605054],
        [110.16805344563369, 2.995844526881356],
        [112.16059914247963, 3.088072385130478],
        [109.1146186356347, 3.18743207947091],
        [105.54619841567009, 3.312971779979301],
        [106.3202708800161, 3.4276440953071114],
        [114.33722053644648, 3.344133965620099],
        [112.92918134831227, 3.4381384626594937],
        [113.718951806636, 3.558031270781385],
        [116.1077086157504, 3.674626763767283],
        [113.00442469213318, 3.7762444358668197],
        [121.60592090848209, 3.7752256616595385],
        [124.08464852672147, 3.8528412973286206],
        [115.43396380615195, 3.871832101059063],
        [115.97413504743201, 3.9391853344354932],
        [125.8729518204765, 3.938226299245204],
        [115.42096863222038, 4.049826055865136],
        [126.37246535539299, 4.016637533308728],
        [119.26860441876563, 4.1360137597935065],
        [127.58134659894448, 4.122212467218198],
        [119.0, 4.222431654130961],
        [127.45587471748802, 4.2487413713838835],
        [114.38968484964018, 4.327012511905162],
        [130.97327971765844, 4.361661032136486],
        [114.0175425099138, 4.446136931233765],
        [131.46862743635836, 4.482169393107846],
        [111.00450441310929, 4.5220604406927825],
        [132.83448347473634, 4.546002679839581],
        [113.0, 4.579252652833042],
        [129.46814279968643, 4.627323440416045],
        [116.15506876585283, 4.66071089590226],
        [131.06105447462264, 4.681864113467487],
        [115.0173899895142, -1.553406775505566],
        [131.0953851209111, -1.532646905923914],
        [114.6298390472568, -1.4659193880646628],
        [134.8369385591352, -1.4593201049851183],
        [113.77170122662314, -1.39408747072486],
        [134.97407158413796, -1.3995575906894588],
        [116.18089343777659, -1.3362556979291647],
        [133.64505228402584, -1.3367065254892703],
        [116.37869220780924, -1.2381766352209842],
        [136.95619737711763, -1.228263545470258],
        [118.30891766895681, -1.171453873112189],
        [134.8517704741024, -1.1668782500365544],
        [118.51160280748886, -1.1071487177940906],
        [135.95955280891445, -1.0972806170705514],
        [116.9700816448377, -1.042106493830834],
        [134.97036711811967, -1.0341887521522781],
        [115.93532679903913, -0.9756168129799077],
        [137.0109484676316, -0.982793723247329],
        [121.03718436910205, -0.9025069079643125],
        [137.00364958642524, -0.919996077557915],
        [127.66362050325849, -0.8630196721348419],
        [139.51702405083043, -0.8411778044243442],
        [127.28707711311466, -0.7965088172950558],
        [137.88763541376724, -0.7802700032232139],
        [126.66885963013956, -0.7463119347609998],
        [138.77319625922004, -0.7344219563221349],
        [126.50691680694776, -0.6846171643127805],
        [140.24621207005913, -0.6691730710306308],
        [124.61942063739504, -0.6258464424641885],
        [135.09256086106296, -0.6064809929193544],
        [121.49074038789952, -0.5743048301747018],
        [133.25539388707685, -0.5442804849459799],
        [123.54756169184401, -0.507098504392337],
        [133.7235955244997, -0.47368071714818183],
        [123.00406497347964, -0.44546779392782787],
        [129.76902558006668, -0.4291785080012981],
        [122.56018929489298, -0.3759609538713056],
        [130.74020039758238, -0.367722982582348],
        [126.19429464123962, -0.3392926144540447],
        [125.15989773086265, -0.25854372249918195],
        [123.76186811776881, -0.21165766724861695],
        [123.32072007574396, -0.1464841783935612],
        [123.25988804148737, -0.06494916896802276],
        [126.0, 0.0],
        [118.03812943282352, -0.025418253259075704],
        [118.15244390193544, 0.050803704058221655],
        [122.9186723000212, 0.12233683381549594],
        [124.53513560437472, 0.20211993414949378],
        [122.97154142320898, 0.2548402763680008],
        [125.22779244241272, 0.3167000922875696],
        [121.43310915891102, 0.32695884063571407],
        [109.88175462741756, 0.2295273542432904],
        [107.8563859954523, 0.3012255778623859],
        [110.86027241532469, 0.3788313368029068],
        [109.59014554237986, 0.44324227831426805],
        [112.76967677527502, 0.49934672168013006],
        [116.49892703368559, 0.6022873461349642],
        [121.82364302548172, 0.6632029927060933],
        [128.8875478857442, 0.7305083008032945],
        [130.13838787997952, 0.7636624565556557],
        [129.84991336154215, 0.955023086653908],
        [121.65936051122412, 0.8960553845713439],
        [115.36463929644994, 0.8283165774761527],
        [111.12605455067681, 0.7408416852612384],
        [105.4229576515476, 0.6643709435882433],
        [102.08329931972223, 0.5689831581093442],
        [100.23971268913334, 0.49934672168013006],
        [98.48857801796105, 0.41822432957922906],
        [97.71898484941399, 0.3120421215625333],
        [101.20276676059801, 0.20902294280626463],
        [100.71742649611338, 0.11942892601833845],
        [100.24470060806208, 0.06988600163464251],
        [91.02197536858887, 0.02197448429666256],
        [86.0, 0.0],
        [78.00640999302557, -0.012819810472900582],
        [71.02816342831905, -0.028161566987892423],
        [64.6297145282261, 0.13970887428916365],
        [65.0, 0.24870998909352285],
        [61.465437442517235, 0.3835275159569918],
        [63.50590523722971, 0.4566054718924939],
        [65.73431371817918, 0.5795639852933231],
        [68.8839603971781, 0.6928795422778015],
        [71.42128534267638, 0.7952988299854369],
        [76.05918747922567, 0.8878420169045728],
        [79.40403012442127, 0.9373704438257521],
        [85.44003745317531, 1.0022717790638567],
        [90.4267659490264, 1.0626237089595665],
        [97.49358953285082, 1.1025615940046933],
        [105.60303025955268, 1.141034047698208],
        [112.69871339105873, 1.1111169509331238],
        [118.70130580579136, 1.0506052808492732],
        [122.87391912037315, 0.994079925732475],
        [125.2078272313676, 0.9384768605941508],
        [119.8874472161285, 1.017502001472604],
        [115.43396380615195, 0.9515538898170608],
        [109.01834707974616, 0.9089486528884919],
        [104.7377677822093, 0.8259165158757953],
        [98.3107318658548, 0.7638187798309182],
        [96.67471230885562, 0.6828183109791536],
        [93.1933474020544, 0.5790742693677309],
        [89.06739021662193, 0.5038269784412898],
        [87.84645695758026, 0.3974180838845741],
        [86.97700845625813, 0.3035707393236639],
        [90.2551937563706, 0.16697016902492895],
        [89.27485648266257, 0.07849010263733194],
        [126.62148316932637, 0.8133238627900607],
        [122.7721466783081, 0.4016832411457989],
        [119.10079764636339, 0.41481428312106017],
            ]


    p.setup = function () {

      p.createCanvas(p.windowWidth*0.99, p.windowHeight*0.8);
      p.noStroke();
      //p.fill(204, 102, 0);
        numPoints = data.length;
        stepTime = (totalTime - travelTime - waitTime)/numPoints
    };

    p.draw = function () {
        p.background(50*Math.pow(scalar, 2)-50, 50 - rotscalar); // translucent background (creates trails)

        console.log(rotscalar);
        // Get that audio data B-) (cool sunglasses face)
        let audioData = globalAudio.audioData;
        //let max_audio = Math.max(audioData);
        //console.log(audioData);

        // biggest diff of value and 128

        // make diff always between 0 and 128
        maxdiff = 0;
        for(let i = 0; i < audioData.length; i++){
          let cursordiff = Math.abs(audioData[i]-128);
          if(cursordiff > maxdiff){
            maxdiff = cursordiff;
          }
        }

        // Apply smoothing
        if(maxdiff > lastmaxdiff + smoothing_limit){
          maxdiff = lastmaxdiff + smoothing_limit;
        }

        lastmaxdiff = maxdiff;
        // could also try average of absolute differences
        //scalar = p.map(maxdiff, 0, 128, 1, max_scalar);
        scalar = p.map(maxdiff, 0, 128, 1, max_scalar);

        console.log(increasingrotscalar);
        if(increasingrotscalar){
          //rotscalar = Math.pow(rotscalar, 1.01);
          //rotscalar = Math.pow(1.11, rotscalar);
          rotscalar = Math.pow(rotscalar, 1.01);
          console.log('increasing');
        }else{
          rotscalar *= 0.98;
          //rotscalar = Math.log(rotscalar)/Math.log(1.01);
          //rotscalar = Math.pow(10, Math.log(rotscalar)/1.01)
          console.log('decreasing');
        }
        if (rotscalar > rotscalemax){
          console.log('setting false');
          increasingrotscalar = false;
        }else if(rotscalar < rotscalemin){
          rotscalar = rotscalemin;
          console.log('setting true');
          increasingrotscalar = true;
        }



        for (let s = 0; s < numPoints; s++) {
            if(s < 140) {
                p.fill(p.lerpColor(red1, red2, s/140));
            } else if (s < 256) {
                p.fill(p.lerpColor(green1, green2, (s-140)/116));
            } else {
                p.fill(dark)
            }



            let tempT = (t - s*stepTime)%(totalTime*2);

            let orginX = p.windowWidth/2*0.99;
            let orginY = p.windowHeight/2*0.8;

            rot = t*rotscalar;
            wave = (t*6.66)%20;

            let endX = data[s][0]*Math.cos(data[s][1] + rot)*scalar;
            let endY = data[s][0]*Math.sin(data[s][1] + rot)*scalar;

            let x = (tempT%travelTime)/travelTime*(endX) + orginX;
            let y = (tempT%travelTime)/travelTime*(endY) + orginY;

            if(tempT >= travelTime) {
                x = orginX + endX;
                y = orginY + endY;
            }

            if(tempT >= totalTime) {
                x = (1 - (tempT%travelTime)/travelTime)*(endX) + orginX;
                y = (1 - (tempT%travelTime)/travelTime)*(endY) + orginY;
            }

            if(tempT >= totalTime + travelTime) {
                x = orginX;
                y = orginY;
            }
                // each particle moves in a circle
                const myX = x + wave * Math.cos((wave/10) * Math.PI * tempT/2);
                const myY = y + wave * Math.sin((wave/10) * Math.PI * tempT/2);// + angle);

                //p.rect(myX, myY, 5, 5); // draw particle
                p.ellipse(myX, myY , 7*scalar); // draw particle
                //p.rotate(Math.PI * t);
        }
    t = t + 0.01; // update time


    };
  };
