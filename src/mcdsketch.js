import globalAudio from './globalAudio'

export default function sketch (p) {
    let t = 0; // time variable
    let inOut = false;
    let numPoints = 0;
    let stepTime = 0;
    let travelTime = 0.05;
    let totalTime = 1.5;
    let waitTime = 0.5;

    let scalar = 0.15;
    let max_scalar = 0.3;

    let wave = 0.5;
    let rot = 0;
    let relOrX = 0;
    let relOrY = 0;
    let xVel = 4;
    let yVel = 4;


    let red1 = p.color(255, 35, 79);
    let red2 = p.color(255, 126, 27);
    let green1 = p.color(20, 209, 190);
    let green2 = p.color(0, 102, 204);
    let dark = p.color(30, 200, 0);

    let data = [
        [1922.2031630397448, 2.9526654149260856],
        [1880.5650746517654, 2.9413813748280857],
        [1900.5643898589703, 2.9979841637937064],
        [1864.9058957491661, 2.988168732010948],
        [1809.5516019168947, 2.9800780112362215],
        [1828.8362419855966, 2.9607121086260797],
        [1759.2344926131934, 2.9754160352233328],
        [1696.1158568918574, 2.9727607515786723],
        [1645.8632993052613, 2.9675539896227967],
        [1583.8525815239245, 2.9606661928356717],
        [1552.3855835455313, 2.9569569823704014],
        [1509.1550616156048, 2.9516043656710775],
        [1463.6437408058014, 2.9504947459778488],
        [1660.9108946599151, 2.8909189585755106],
        [1624.9855383971883, 2.913779045736618],
        [1577.854556034871, 2.919211619177531],
        [1529.7963916809322, 2.9248380559161795],
        [1454.6425677808277, 2.9359729296964057],
        [1853.4953466356478, 2.945572608690833],
        [1797.6212059274335, 2.9393967814951476],
        [1745.0512886445488, 2.940825562347726],
        [1697.8227233724963, 2.9273317798479743],
        [1659.1036736744331, 2.910501986393896],
        [1468.3330684827608, 2.915610548590644],
        [1417.3849159631973, 2.8935339180675],
        [1351.4588414006548, 2.8757948843738714],
        [1323.8855690730977, 2.8606991012529788],
        [1271.259611566418, 2.8429780548940724],
        [1234.9919028074637, 2.833925675016011],
        [1178.0343798039173, 2.8077621499042698],
        [1136.55488208885, 2.7950767766047],
        [1090.0316509166144, 2.7609159187277985],
        [1048.3863791560818, 2.744967212079149],
        [995.9618466587965, 2.7084836158621184],
        [950.3525661563713, 2.6708863382960457],
        [916.6471513074156, 2.6520845347755286],
        [866.755444170961, 2.621158617903119],
        [819.2539288889618, 2.5976144494809925],
        [767.7629842601166, 2.5658726693359832],
        [713.1577665566014, 2.5376442993774067],
        [659.0068284926948, 2.502643865397948],
        [624.2387363821633, 2.4605971019096513],
        [580.820109844692, 2.414664353522096],
        [544.5181356024792, 2.369180773112517],
        [508.82315198897936, 2.315882543805676],
        [472.0381340527479, 2.227008615351607],
        [436.87297925140666, 2.144196793662001],
        [403.38691104199205, 2.0333352887998037],
        [367.14166203251847, 1.8951308547686943],
        [354.2033314354906, 1.7582254392385703],
        [335.01343256651666, 1.5797513112958632],
        [338.4213350248474, 1.4284813867156845],
        [339.6380426277363, 1.2564944242104976],
        [349.79422522391644, 1.127606221486268],
        [369.4604173656496, 0.9955557931103606],
        [385.0116881342695, 0.8810463697146402],
        [1614.6640517457495, 2.8758837874381347],
        [1581.5716866459136, 2.861642831066002],
        [1543.8785574001604, 2.8417603259654287],
        [1501.8977994524128, 2.8331072717970174],
        [1463.200943138023, 2.8153035524434307],
        [1419.9496469945686, 2.796010568197464],
        [1368.0014619875228, 2.776833006327297],
        [1329.2072825560354, 2.7608068688289293],
        [1286.7513357288578, 2.725577742020432],
        [1242.800064370774, 2.7045766157091347],
        [1197.1975609731253, 2.6745830848984173],
        [1157.5512947597615, 2.6454864059505727],
        [1116.4465952297046, 2.618224811286178],
        [1083.6996816461653, 2.600698394690533],
        [1048.9389877395158, 2.5522679989880297],
        [1006.9409118711982, 2.52411388321365],
        [986.6068112475202, 2.4776158990572883],
        [934.8780669156807, 2.4600025034023054],
        [869.1541865515002, 2.415619145218044],
        [814.0423821890356, 2.3761744549125488],
        [751.2083599108838, 2.329835248375279],
        [712.5145612547157, 2.2836850179254258],
        [666.3009830399471, 2.2317078647394064],
        [627.936302502093, 2.1658659505004376],
        [577.8797452757797, 2.0925180953586566],
        [550.9736835820745, 2.0295738444285396],
        [516.0717004448122, 1.94158728451529],
        [483.33011493181345, 1.8689910296104193],
        [459.10891953870816, 1.7703277227819],
        [452.4477870428808, 1.674863455429131],
        [443.28884488558924, 1.534694637647788],
        [448.0379448216412, 1.4206923857413933],
        [438.04680115257094, 1.2670943538761856],
        [441.1915683691156, 1.1629283588209864],
        [465.1042893803496, 1.0311142895174659],
        [494.0789410610414, 0.9608994121245507],
        [528.7958017987662, 0.8724261053088934],
        [572.1477082013, 0.8039374482370146],
        [612.721796576554, 0.7507699787212676],
        [654.8106596566674, 0.7043195238669829],
        [684.2112246959998, 0.6683497943663436],
        [724.9275825901509, 0.6247395135383866],
        [793.2294749944684, 0.5925480267886268],
        [835.1724372846604, 0.5591069939393678],
        [878.8230766200896, 0.5283201687916329],
        [934.7684205192214, 0.5095922648089258],
        [984.9187783771818, 0.4813569290982249],
        [1053.7722714135157, 0.44751997515716985],
        [1090.6823552253882, 0.43740261108161593],
        [1142.5712231629152, 0.4162692978569417],
        [1200.0120832724976, 0.40697078536877124],
        [1264.5983552100643, 0.38505847489159606],
        [1343.084881904342, 0.3662650833333574],
        [1410.0088652203574, 0.3632530840119952],
        [1481.2957165940904, 0.345022030491332],
        [1522.7754266470154, 0.33524921524511686],
        [1576.7136708990633, 0.3233550455989995],
        [1619.444657899738, 0.31452552877948037],
        [1775.8271312264603, 3.2709067469682043],
        [1740.7564447676189, 3.284545845586636],
        [1692.2485042097098, 3.2964434340850786],
        [1633.1812514231235, 3.3138883806415262],
        [1570.3072947674923, 3.3416109125592097],
        [1513.0082617091025, 3.3662117765710695],
        [1467.8256027198872, 3.3865713167166573],
        [1426.1135999632006, 3.4127647122421],
        [1386.1735100628637, 3.429801808849789],
        [1350.0448140709996, 3.4532709320757156],
        [1302.103298513601, 3.48058706578634],
        [1263.9280042787248, 3.5013819363425926],
        [1217.8554922485673, 3.5324676740564116],
        [1178.5219556715947, 3.563866241644193],
        [1129.667207632407, 3.602073210629897],
        [1087.872235145286, 3.641012737458919],
        [1049.9390458498056, 3.675151758387073],
        [1009.554357129917, 3.7295952571373605],
        [971.8312610736496, 3.7632775452853466],
        [927.6987657639736, 3.823909208464541],
        [895.7879213295969, 3.8906718813186045],
        [869.0414259400986, 3.931059142792377],
        [857.1026776296992, 3.99882728895295],
        [818.6000244319566, 4.069132191156542],
        [778.8741875296677, 4.110498380906155],
        [731.312518694983, 4.161181906094576],
        [678.2359471452394, 4.221043970719879],
        [633.0695064524906, 4.296089267514907],
        [607.963814712685, 4.366709591458928],
        [570.9404522364832, 4.461038270960213],
        [540.722664588789, 4.554537224234279],
        [521.2158861738579, 4.683606144467248],
        [503.7539081734255, -1.487325388357242],
        [487.1652696980769, -1.3661545169651186],
        [489.52221604335796, -1.2464617988210989],
        [497.14484810767175, -1.1413388095935346],
        [505.6896281317227, -1.0514049341623186],
        [520.8301066566717, -0.9380474917927134],
        [547.3618547176995, -0.8383886122753693],
        [568.8585061331157, -0.7505863619315756],
        [599.9083263299485, -0.6625051561131591],
        [632.6902875815307, -0.5748512355531549],
        [1751.1724643792227, 3.2439887270127548],
        [1691.089589584183, 3.2660943402287987],
        [1641.4883490296238, 3.2698769009996274],
        [1601.3909578862995, 3.293292449915113],
        [1548.159229536807, 3.310988942710587],
        [1496.773195911792, 3.334533316285961],
        [1443.3104309191422, 3.350266441570344],
        [1365.1318617628115, 3.3721799862365263],
        [1317.6949571126088, 3.405714780508961],
        [1249.8739936489599, 3.4362680743965837],
        [1208.953679840547, 3.4683130859797364],
        [1149.4668329273359, 3.5035198147517654],
        [1098.0072859503255, 3.540026744423434],
        [1051.0689796583285, 3.57247208959677],
        [1008.0515859815905, 3.613225895854282],
        [972.0792148791168, 3.654486456810977],
        [937.8869867953175, 3.6988357310668913],
        [898.3479281436564, 3.7345350131917323],
        [856.5278746193844, 3.767813838401064],
        [822.7666740941809, 3.838353958461442],
        [783.7244413695415, 3.901725436200757],
        [744.186132630809, 3.9792742381756687],
        [778.393859174133, 4.029823157739196],
        [697.1950946471153, 4.02756773444209],
        [648.778082243844, 4.092318673758489],
        [614.5868530972657, 4.153272245287371],
        [572.8699677937394, 4.209698721428717],
        [544.6475924852693, 4.286521250065584],
        [497.7569688110856, 4.383014685509379],
        [483.6744773088611, 4.482955704828536],
        [468.6704599182671, 4.571095426009008],
        [445.54348833755836, 4.662990997067652],
        [439.6020928066653, -1.5184523852176566],
        [437.35226076927967, -1.342455063511728],
        [419.1479452412954, -1.2226368192619625],
        [442.3087157178796, -1.0990599154456142],
        [446.27569954009374, -0.9734714327116061],
        [466.84044383493597, -0.8672815343140717],
        [497.51884386422995, -0.7441697609511133],
        [527.9024531104208, -0.6632029927060933],
        [566.6330382178576, -0.5831078800337097],
        [606.473412442788, -0.5042157449211391],
        [1563.5872217436417, 3.268565443203872],
        [1507.0633696032826, 3.2733549200677197],
        [1444.6331714314192, 3.2790844503471464],
        [1381.264999918553, 3.285435031838153],
        [1331.80066075971, 3.290816751331652],
        [1287.3181424962518, 3.296013773185599],
        [1243.8601207531335, 3.3014545708491374],
        [1180.7201192492655, 3.3100830061179805],
        [1137.3671350975462, 3.3165704449283386],
        [1049.840464070613, 3.331329106717459],
        [993.921526077386, 3.342145266881407],
        [938.1327198216678, 3.3542494161521628],
        [875.6785940058145, 3.369675417740383],
        [809.1384306779651, 3.396463080408534],
        [772.4254009287887, 3.408866616771271],
        [717.6071348586216, 3.429846042047177],
        [650.7995082972943, 3.4604277643516603],
        [474.1698008097943, 3.556176742289166],
        [400.48096084583096, 3.638747270371463],
        [437.0823720993561, 3.5786344643816435],
        [348.0517202945562, 3.767854091188548],
        [294.2108087749327, 3.9077624178875343],
        [245.97967395701622, 4.030664024731005],
        [191.8567173700207, 4.253403342271212],
        [173.40126873814967, 4.585172763316802],
        [155.72411502397438, -1.3834759927691556],
        [179.0474797365213, -1.024629763361109],
        [200.94277792446286, -0.8205948897839467],
        [235.77955806218657, -0.6044717026433267],
        [279.25078334715556, -0.5004899049489238],
        [331.2823569102345, -0.37714316109356505],
        [659.0637298471219, 3.496456400034492],
        [658.6934036408745, 3.5706073767590314],
        [662.5986718972504, 3.6646698595295986],
        [669.8134068529832, 3.735806357390227],
        [689.0464425566684, 3.821093306016399],
        [703.4330103144151, 3.886771069201686],
        [721.0166433585289, 3.963284980175632],
        [354.8309456628607, 3.8211751072800464],
        [388.9113009414872, 3.9233544693787996],
        [416.5573189850348, 3.9881389796365427],
        [473.9894513594158, 3.645822313393594],
        [462.55053777938684, 3.7595802685869866],
        [438.32065887886233, 3.873729444474735],
        [380.61529133759194, 4.102523971443539],
        [349.08451698693256, 4.210298781362695],
        [315.49643421122846, 4.332471184722898],
        [287.67342595380615, 4.480900224037847],
        [274.4102767754881, 4.657699045813783],
        [265.37709019431196, -1.3889205850674426],
        [273.5434152013168, -1.200472897092122],
        [291.2181313036673, -0.9808889636461291],
        [317.90721916936707, -0.8365783734619756],
        [345.5792239125495, -0.7014073140413917],
        [378.5828839237189, -0.5880026035475675],
        [387.07234465923807, -0.4983157942103058],
        [370.41733220787603, -0.4080821334899872],
        [1226.2874866849127, 3.2773774558610946],
        [1227.0798670013294, 3.2411802162335817],
        [1203.1242662335426, 3.18482692684593],
        [1202.0815280171307, 3.1532393815251853],
        [1202.399683965361, 3.1158080199738256],
        [1197.6581315216793, 3.0889657073077954],
        [1135.8961220111635, 3.0587438621082805],
        [1079.7342265576283, 3.0479141607663602],
        [1006.1813951768339, 3.0220453143097226],
        [944.4426928088332, 3.0077816761152025],
        [863.1529412566466, 2.9880625009706376],
        [806.8704976636585, 2.9772589719197415],
        [765.851813342503, 2.951111196110034],
        [702.8684087366568, 2.8973041214782773],
        [644.6619269043272, 2.8939804374844025],
        [573.6287998348758, 2.8860435596484115],
        [376.5979288312669, 2.729030166988256],
        [334.647575816709, 2.649877550978051],
        [284.83855076165514, 2.5535900500422257],
        [243.50770008359078, 2.402672621543348],
        [225.656819085974, 2.3279888062062017],
        [191.049731745428, 2.109420496857947],
        [154.7804897265802, 1.7922683487190703],
        [151.02979838429235, 1.5906612630460615],
        [120.06664815842908, 1.5374753309166493],
        [128.41339493993607, 1.0758001059458895],
        [106.60675400742676, 0.6322445486102357],
        [89.28605714219886, 0.2721458905311873],
        [89.8443097808648, -0.2935889874087498],
        [111.5212984142491, -0.6901458859786819],
        [143.60013927569847, -0.9286879747612354],
        [168.5852899869974, 1.0354632526488032],
        [214.24518664371436, 1.09044880905164],
        [691.3645926716235, 2.8541535709379744],
        [708.7432539361486, 2.8051175944880637],
        [1195.3530859122754, 3.0469185487627484],
        [1201.2476847012026, 3.004640225511271],
        [1207.0227835463588, 2.973447526412693],
        [1238.4768871480808, 2.946572386184872],
        [1173.927595723007, 2.9191354970648518],
        [1120.0446419674531, 2.901810998676107],
        [1049.4893996606158, 2.8735020639732456],
        [989.9136325962987, 2.849555307653201],
        [951.5382283439799, 2.8241624445293323],
        [889.7505268332242, 2.7857159505098235],
        [830.9879662185248, 2.759298568884668],
        [754.6151336939911, 2.7182553438087007],
        [711.0731326663946, 2.681089688311429],
        [638.2045126759916, 2.6681345674680115],
        [572.7128425310541, 2.646705211158719],
        [427.8247304679803, 2.50884381858761],
        [378.85749299703707, 2.410347101230539],
        [333.965567087387, 2.2820208392595975],
        [294.838939083697, 2.148451228189045],
        [252.66776604861965, 1.8887922054688893],
        [242.39636960977776, 1.7115265207851218],
        [228.21919288263203, 1.526964769069259],
        [235.03404008781365, 1.2234793389075063],
        [1787.1765441612085, 3.23123936991128],
        [1782.9200767280624, 3.198833425755348],
        [1775.4202319451022, 3.1815938525880934],
        [1780.3058725960548, 3.160129855840841],
        [1780.040448978618, 3.1348511826854506],
        [1795.1582102979114, 3.092552250266042],
        [1796.557263212058, 3.0786530283914555],
        [1797.01112962608, 3.074765374513457],
        [669.546114916665, 3.343088952023441],
        [652.5825618264711, 3.2305877254584687],
        [650.1507517491616, 3.1631277854526614],
        [652.4078478988431, 3.055651021689869],
        [656.761752844972, 2.9979729478041923],
        [855.7411991951773, 3.284646541259134],
        [847.3989615287477, 3.1722795936005426],
        [847.339955389807, 3.1132649322460315],
        [849.8058601821948, 3.060308157572165],
        [1027.7183466300482, 3.279223874705497],
        [1026.9961051532766, 3.2039507250046784],
        [1025.0004878047619, 3.142568263036358],
        [1027.319813884654, 3.0743769892569586],
        [354.64489281533434, 3.4927727105716437],
        [342.96501279285036, 3.2937986213402004],
        [339.2889623904674, 3.1828671345454977],
        [342.6674773012461, 2.9951558035127284],
        [346.01300553591915, 2.8664688473452506],
        [182.72657168567466, 3.822316430411418],
        [148.95972610071487, 3.448482306321573],
        [142.50614021858848, 3.0572859210635865],
        [150.5456741324705, 2.803036958678109],
        [167.05687654209268, 2.5868004264518976],
        [115.97413504743201, 4.582686443228778],
        [54.120236510939236, 4.431551255763487],
        [32.28002478313795, 1.853351279264484],
        [15.0, 2.214297435588181],
        [101.40019723846694, 1.6596705016080044],
        [1754.5099030783497, 3.0554221319662975],
        [1661.7186885872109, 3.039109637271694],
        [1737.337330514716, 3.0435849388610836],
        [1661.7186885872109, 3.039109637271694],
        [1618.706273540694, 3.0320269860825224],
        [1568.710617035532, 3.024670114889986],
        [1525.6424876097283, 3.0127661441296434],
        [1464.0027322378876, 3.003173173838562],
        [1394.7057037239074, 2.9962480360881028],
        [1352.2488676275532, 2.9864132507550356],
        [1292.2724171009763, 2.9642308429928983],
        [1268.7651476928265, 2.956099453280411],
        [1350.0270367663013, 3.250695683786039],
        [1343.8768544773736, 3.1944494842110642],
        [1342.5099627190855, 3.1140288465038575],
        [1343.477949204973, 3.0946822356423946],
        [1345.2880732393342, 3.0716621607125396],
        [1345.3103731109784, 3.023875953565436],
        [1351.1846653955188, 2.9915316606252387],
        [1250.0255997378613, 3.0148562386589597],
        [1298.9707463988557, 2.9947963458599673],
        [258.21309029559285, 0.9838678366903224],
        [311.8348922106056, 0.7876657332070669],
        [354.3585754571208, 0.6734187746378882],
        [441.54841184178207, 0.5936558096553426],
        [435.4124481454337, 0.6747409422235527],
        [415.2457103932562, 0.756445438366959],
        [616.0600620069442, 0.4919624796821166],
        [673.1493147883314, 0.4470378409469251],
        [719.4755034050846, 0.4163897281940997],
        [770.5063270343729, 0.4055734494378522],
        [834.1702464125653, 0.38852045309004407],
        [1005.3561557975363, 0.33338890904240975],
        [1052.7302598481722, 0.3178454976471968],
        [1088.8916383185244, 0.30693897425256883],
        [1137.6124120279278, 0.29339330801237445],
        [1190.1949420158028, 0.2914567944778671],
        [1246.5604678474285, 0.2829277251355385],
        [1289.8325472711565, 0.273187882443331],
        [1363.1683681776071, 0.25814516202700855],
        [1418.3543280858983, 0.24788563168260935],
        [1479.5093781385774, 0.23743782245837802],
        [1632.4166134905636, 3.06801563962859],
        [1622.2237823432376, 3.10274730588468],
        [1602.0078027275647, 3.1384715650974915],
        [1577.857091120739, 3.1745547119385877],
        [1567.322557739791, 3.206717816924179],
        [1558.5281518150387, 3.2399205675623484],
        [1542.6396209095628, 3.3744649899594577],
        [1543.9601678799877, 3.4258530960890146],
        [1542.8768583396409, 3.4647779272315717],
        [1538.6373841812112, 3.4960274313607274],
        [1531.6543343718256, 3.5292521579703098],
        [1525.9678895704194, 3.5621458098858083],
        [1515.7021475210754, 3.616452539838936],
        [1511.519103418809, 3.6463778347728764],
        [1509.372386126101, 3.686216196812393],
        [1497.4675288633139, 3.721075366977977],
        [1484.400552411646, 3.768655410290506],
        [1468.915246023405, 3.7976203402541238],
        [1439.9253452870396, 3.841932863005761],
        [1413.9692358746706, 3.8754591138702787],
        [1376.3204568704193, 3.9064387265474747],
        [1330.8831654206165, 3.939742516848614],
        [1273.7001216927006, 3.964750638487744],
        [1220.8628096555321, 3.9814612431760317],
        [1163.1100549819007, 3.995742736592965],
        [1114.0471264717664, 4.002594370749479],
        [1054.548244510416, 3.994094217108029],
        [992.4716620639604, 3.9982982817725317],
        [937.6705178259579, 3.9828239662428877],
        [896.4875905443421, 3.980651732421719],
        [577.8001384561966, 3.6734044709361235],
        [536.6609730546837, 3.609406905144863],
        [491.6197717748952, 3.5406084391273884],
        [466.6529759896534, 3.4328441935549434],
        [428.967364726036, 3.3220716745684107],
        [422.23216362565273, 3.1747558460923577],
        [399.1440842603082, 3.0159946516036564],
        [390.2947604055171, 2.8798349562003285],
        [394.07740356432515, 2.7483631176294843],
        [422.75406562208246, 2.6080695957075575],
        [1458.971212875703, 3.429307343686345],
        [1446.4370017391009, 3.4594079418994244],
        [1557.7631398900155, 3.0483755244915995],
        [1547.174521506866, 3.0885679709184557],
        [1520.3160855558951, 3.121200743740446],
        [1507.5045605237817, 3.167466108764119],
        [1491.0935584328704, 3.2060194930153467],
        [1470.3666209486667, 3.241735015188108],
        [1442.9279261279823, 3.49249521886932],
        [1442.1653858001168, 3.540384178661781],
        [1445.0605523645022, 3.5773836931968397],
        [1441.5869727491297, 3.622613630773476],
        [1435.799428889704, 3.6863121751357633],
        [1427.2505035907327, 3.726486056118718],
        [1425.8990146570688, 3.7646140222501114],
        [1402.1287387397779, 3.8173360459119516],
        [1363.4753389775701, 3.8402749416398687],
        [1336.3382805263045, 3.8825286136753334],
        [1304.4232441964532, 3.898798722173245],
        [1255.2023741214005, 3.9151603830285455],
        [1205.6421525477615, 3.93344234038021],
        [1146.930686658963, 3.929456903233371],
        [1075.5152253687531, 3.9302781161255895],
        [1021.7754156369197, 3.9304510107900663],
        [958.1362116108544, 3.930680837139442],
        [917.8779875342909, 3.916205410865624],
        [610.2073418109618, 3.515708369072417],
        [577.6028047023318, 3.422270429395981],
        [551.514279053589, 3.3276089037755914],
        [530.9105386032566, 3.2264545157214033],
        [491.3298281195637, 3.1049491855323272],
        [496.6950774871843, 2.990014808023421],
        [508.43386983952985, 2.878963151987594],
        [519.5969591904864, 2.8082784028419727],
        [524.1831740908897, 2.691596073699745],
        [638.0195921756635, 4.414927153750486],
        [649.1502137410108, 4.510763838505746],
        [634.717259888212, 4.578067538431721],
        [617.6350054846308, 4.667039219563186],
        [604.6957912868255, -1.5228199253394978],
        [590.444747626736, -1.434887224574646],
        [555.6626674521152, -1.3328013999747832],
        [536.3226640745289, -1.2502250171346465],
        [392.22060119274715, -0.367722982582348],
        [397.39401102683973, -0.1796284266475055],
        [416.8117080889163, -0.06241880999595735],
        [416.69173257937337, 0.057628427477473966],
        [452.40800169758273, 0.13970887428916365],
        [476.36225711111916, 0.25465249576623716],
        [610.5186319843154, 4.509532504694595],
        [601.6311162165733, 4.6024659734694655],
        [572.0078670787667, 4.707144273229101],
        [550.3907702714499, -1.4597378215333912],
        [521.1765535785354, -1.3542085433689335],
        [349.9842853615002, -0.23943471438199126],
        [348.5656322703086, -0.09481570743158609],
        [366.0341514121326, 0.013660352424636427],
        [392.23717314910374, 0.19239560151592244],
        [399.59229221795556, 0.2710808088104926],
        [441.58351418502934, 0.3805063771123649],
        [489.8346659843503, 0.5285153007122743],
        [487.2832851637741, 0.371741357676016],
        [525.0838028353188, 0.4491682121097498],
        [887.1076597572586, 0.40311558921869894],
        [866.3353854022124, 0.3425580657746966],
        [852.5637806052988, 0.29392842184569934],
        [832.3172472080582, 0.19833806663960143],
        [823.786987030021, 0.13760523546215273],
        [818.4283719422244, 0.07705302705095719],
        [816.0153184836666, 0.006127374295731752],
        [818.0586776020409, -0.07095909343550952],
        [826.9292593686597, -0.162762996055961],
        [1101.3019567766144, -0.7185737426869416],
        [1167.1610857118224, -0.7411577944857249],
        [1251.2078164717482, -0.7622253759260769],
        [1301.1694739733175, -0.7734422113712388],
        [1367.5627956331657, -0.7905687481354797],
        [1426.2850346266696, -0.7938263227791177],
        [1484.3062352493168, -0.7963553237297589],
        [1542.9231996441042, -0.7808152440622498],
        [1591.9613688780264, -0.7671860501477133],
        [1723.4572811648104, -0.5900946507047066],
        [1735.7687057900312, -0.5464464997168369],
        [1726.3270257978354, -0.5154818110608071],
        [1721.0941287448516, -0.4794986721604445],
        [1619.9200597560362, -0.11072539214658983],
        [1613.6855331817287, -0.06759870877560978],
        [1611.044381759857, -0.036009272623297346],
        [1622.0443890350227, 0.007398138760402396],
        [1616.9700059061083, 0.03463960398165799],
        [1620.4493204046832, 0.07412138630653924],
        [1629.4591127119452, 0.12861773800477538],
        [1636.623658633835, 0.15892073182009178],
        [1663.0892940548922, 0.20282003494620787],
        [1675.7356593448742, 0.23672874174442401],
        [1564.2803457181196, 0.28312926669498756],
        [1552.5633642463679, 0.2559140184980806],
        [1532.455545847905, 0.19969911349229597],
        [1523.1588886258714, 0.16687560500172988],
        [1515.5223521941205, 0.13368521978517095],
        [1509.5711311495063, 0.10019597430636765],
        [1503.871337581776, 0.04989198363504056],
        [1502.107852319533, 0.011983447652227266],
        [1502.5062395877096, -0.025959546559014526],
        [1498.0791033853986, -0.06412600354060917],
        [1502.8087037277899, -0.10198606872271211],
        [1645.894589577352, -0.4992497425794304],
        [1641.2416031773018, -0.5408374730780099],
        [1637.9026222581122, -0.5744555915183507],
        [1633.4142156844357, -0.5990396829511324],
        [1624.3158559836816, -0.6315573349371825],
        [1561.7416559725875, -0.7469033695027804],
        [1503.6399170014076, -0.748238805696173],
        [1450.0206895075669, -0.7346604964519882],
        [1392.3462213113519, -0.7295052697559308],
        [1352.9453056202974, -0.7179260922054477],
        [1290.8454593792396, -0.7075339273810614],
        [1243.5384996050584, -0.6862953137201875],
        [1192.114927345514, -0.6664874941053841],
        [920.8023675034725, -0.14604385927870261],
        [914.2483251283537, -0.08432208336973428],
        [911.1075677437873, -0.01536651815939768],
        [911.5272897725005, 0.03401541483025752],
        [914.6830051990689, 0.08976906292881635],
        [922.4673435954251, 0.15784173207257557],
        [934.6667855444528, 0.225515769367456],
        [949.0400413048967, 0.2840891441824867],
        [966.5660867214409, 0.3407273336991812],
        [828.204081129766, -0.9241558899906671],
        [793.5300876463349, -0.8907415200043076],
        [748.8885097262475, -0.8307356942340872],
        [721.959140118054, -0.7824598760649678],
        [686.9556026411022, -0.7297854637934292],
        [662.2265473385977, -0.687004478341245],
        [633.4919099720216, -0.5967589471729452],
        [605.6145638935708, -0.48063268151202015],
        [589.0101866691272, -0.4233958056278204],
        [573.649718905187, -0.3283656728973689],
        [616.7592723259213, -0.27250907784724443],
        [678.6162391219356, -0.24712304868912946],
        [727.2001100109928, -0.23030326578382385],
        [776.9407956852311, -0.21531840696691348],
        [851.3407073551693, -0.1962437520201416],
        [914.1974622585648, -0.18259295091830763],
        [994.9457271630448, -0.16762719183710184],
        [1064.9812204917043, -0.16221568181140025],
        [1128.1883707962957, -0.1530536682883185],
        [1191.5221357574521, -0.15079889661244353],
        [1271.8793181744877, -0.13088893706027613],
        [1348.0181749516585, -0.1279434958896407],
        [1410.526142969353, -0.12224455096883208],
        [1467.1172413955198, -0.11750694468120568],
        [1530.694286916888, -0.1126051301163131],
        [1606.2356614146008, -0.10728837864166971],
        [1668.8870542969646, -0.10324602812003479],
        [1745.495058715435, -0.09869955006965389],
        [1802.226400871988, -0.09558298617893618],
        [1846.030335612067, -0.093308238046857],
        [1878.8805177551872, -0.1259393607943364],
        [1906.5911989726587, -0.15747442952275142],
        [1931.747913160514, -0.1953651057874407],
        [1946.5482269905363, -0.23064942586550938],
        [1960.3645069221184, -0.2589594398526277],
        [1980.7607124536776, -0.2829459501193163],
        [2007.1355210847123, -0.31560599646753135],
        [2039.711008942198, -0.35291775036063305],
        [2057.895041055301, -0.3761750560661501],
        [2078.6238235909836, -0.3919415973996998],
        [2034.777629128058, -0.3976642404799559],
        [1999.7969896967043, -0.405023106047953],
        [1947.5381896127224, -0.41655601352106264],
        [1901.0113098032846, -0.4274111237892852],
        [1866.49618269098, -0.43585036038407926],
        [1817.8022444699534, -0.44470302531884676],
        [1780.5150940107192, -0.4503351575935538],
        [1729.3758989878402, -0.46468200221864275],
        [1692.7566275161944, -0.47157346680929996],
        [1630.7069019293442, -0.491075571224454],
        [1586.7907864617819, -0.5059355006931465],
        [1552.7916795243334, -0.5181076930206036],
        [1510.3711464405033, -0.5196388464066962],
        [1472.3413327078745, -0.5344789760921892],
        [1430.6711711640799, -0.546892677657474],
        [1388.2074772886076, -0.5656242455975259],
        [1356.2787324145431, -0.5806407733555174],
        [1318.8847561481632, -0.599358582250302],
        [1275.2983964547277, -0.6104047721345636],
        [1235.1619327035626, -0.6273081922757625],
        [1210.2008097832359, -0.6423442757281073],
        [1189.484762407657, -0.6554393342793381],
        [1136.9648191566878, -0.6688344175049612],
        [1112.8099568210198, -0.6861088735588007],
        [1078.369602687316, -0.7125490039681519],
        [1049.9090436794988, -0.736213318794209],
        [1008.5286312247164, -0.7657653426427878],
        [981.489684102691, -0.7926026496971543],
        [955.621787110361, -0.8112991056356678],
        [933.8763301422732, -0.8361505998645226],
        [895.1094905094013, -0.8731972373471153],
        [879.2587787449154, -0.8949896656142416],
        [863.2334562561856, -0.918490996929551],
        [1516.4976096255477, -0.700901656443334],
        [1554.534335420096, -0.7294202597073933],
        [1588.5921440067618, -0.7475543244808274],
        [1623.6951684352578, -0.7705908833157764],
        [1654.644977026794, -0.7896716416557977],
        [1700.6898600273948, -0.8161704765376319],
        [1758.2821161577, -0.8071163892498188],
        [1798.173795827311, -0.7842184549396081],
        [1844.2735697287428, -0.7551044034786731],
        [1877.295927657651, -0.7386750283762925],
        [1928.8714316926362, -0.714586950562959],
        [1963.8299315368427, -0.6952598565379826],
        [1919.7416492851323, -0.6672565391841184],
        [1883.8187280096777, -0.6479601513282442],
        [1846.4777279999887, -0.6207531374134159],
        [1820.8308543079997, -0.6132905227909772],
        [1777.8236695465612, -0.5912787228719422],
        [1727.3621507952523, -0.5934617657566565],
        [1691.0647533432893, -0.6080130556296107],
        [1638.9423418778342, -0.6303214960707203],
        [1608.400447649776, -0.6442471917187657],
        [1571.6262278289962, -0.666791194166341],
        [1552.0579886073845, -0.6767534168663007],
        [1732.0233832139795, -0.7662090123058846],
        [1701.1290368458237, -0.747147278914202],
        [1662.4045837280405, -0.7270919360156047],
        [1628.1725952736092, -0.7097587744747591],
        [1595.2209878258247, -0.6912869695695169],
        [1797.211729318502, -0.7318638633952257],
        [1775.9870495023324, -0.718459217287856],
        [1755.089171523772, -0.7047328365140482],
        [1778.8178658873426, -0.6934426604241359],
        [1810.2312007033797, -0.6699096451575011],
        [1783.2445149221685, -0.6505669400574285],
        [1744.4477636203385, -0.6266468397319955],
        [1708.2016859844157, -0.6420961220114032],
        [1687.1307003311865, -0.6559485986621454],
        [1830.8959555365236, -0.7104035214412865],
        [1854.507212172549, -0.6995021175411502],
        [754.8436924291016, -0.32635881670676264],
        [786.0852371085466, -0.39019187627066826],
        [815.7769302940602, -0.45158679032841387],
        [853.1775899541666, -0.50664313101762],
        [893.2647983660836, -0.55539533912299],
        [936.8484402506095, -0.5655012197781026],
        [981.0453608269089, -0.5526566516426233],
        [989.5544451923805, -0.5029760306906607],
        [974.4834529123622, -0.46043513726145663],
        [1049.6689954457072, -0.5062657110251336],
        [1100.1827120983132, -0.4933257570791022],
        [1099.7422425277662, -0.4547011213881572],
        [1089.719688727335, -0.408627158717761],
        [1077.4047521706966, -0.3813681487018598],
        [1079.9282383566049, -0.3173581961138254],
        [1067.0168695948532, -0.2781709257411469],
        [1311.092674069991, -0.3260920611278949],
        [1300.5033640863833, -0.34923086427938493],
        [1267.3436787233368, -0.3646812035852174],
        [1220.7415778943553, -0.33470319786447766],
        [1198.2553984856484, -0.29641278907314544],
        [1191.1381112196855, -0.2537342935861982],
        [1206.5674452760609, -0.2180396759102558],
        [1248.322474363095, -0.20572215452793952],
        [1293.247849408612, -0.22378506327568987],
        [1303.4281721675345, -0.2369773452332117],
        [1479.9611481386935, -0.40196392667156505],
        [1463.772181727744, -0.3500550745527109],
        [1450.9259112718332, -0.3117247351446342],
        [1431.008735123584, -0.26514883802702544],
        [1421.5238302610337, -0.23934828413242307],
        [1414.7862029296157, -0.19490041670522473],
        [1517.3084722626445, -0.3958050610506438],
        [1587.7030578795268, -0.377348492872617],
        [1620.8149184900785, -0.3527770967487591],
        [1639.9884145932251, -0.3155801737794803],
        [1619.630204707235, -0.2744832073453506],
        [1574.767284394745, -0.2280363533717201],
        [1555.3346906695035, -0.21050956212735614],
        [1511.6672914368426, -0.1950603279764842],
        [1444.0862162627272, -0.1866666492483179],
        [1749.672540791562, -0.36405525549980605],
        [1760.8327575326398, -0.35012956655205485],
        [1760.063919293842, -0.33881987575620065],
        [1811.3094710733449, -0.2630562436449189],
        [1774.6441896898657, -0.26862428943755096],
        [1746.5259803392562, -0.2505333900535786],
        [1761.2688607932635, -0.22211763278051408],
        [1802.3107390236569, -0.1954369116472499],
        [1783.5021726928173, -0.17584148521043652],
        [1735.9061034514511, -0.16959982710684174],
        [1714.625323503651, -0.18298338002601328],
        [1903.64545018236, 2.9678942233687726],
    ]


    p.setup = function () {
      p.createCanvas(p.windowWidth*0.99, p.windowHeight*0.8);
      p.noStroke();
      //p.fill(204, 102, 0);
        numPoints = data.length;
        stepTime = (totalTime - travelTime - waitTime)/numPoints

        relOrX = p.windowWidth/2;
        relOrY = p.windowHeight/2;

    };

    p.draw = function () {
        p.background(255*scalar, 0, 255*scalar, 100); // translucent background (creates trails)
        //10 (0, 255-255*scalar, 0)
        let audioData = globalAudio.audioData;

        let diffsum = 0;
        for(let i = 0; i < audioData.length; i++){
          let cursordiff = Math.abs(audioData[i]-128);
          diffsum += cursordiff;
        }

        scalar = p.map(diffsum, 0, 131072, 0.15, max_scalar);


        if(relOrX - 300 < 0 || relOrX + 300 >  p.windowWidth*0.99) {
            xVel *= -1;
        }
        if(relOrY - 200 < 0 || relOrY + 110 > p.windowHeight*0.8) {
            yVel *= -1;
        }

        relOrX += xVel;
        relOrY += yVel;

        for (let s = 0; s < numPoints; s++) {
            if(s < 390) {
                p.fill(p.lerpColor(p.color(255, 255, 255), p.color(100, 100, 150), s/390));
            } else if (s < 559) {
                p.fill(p.lerpColor(p.color(255, 255, 0), p.color(200, 255, 0), (s-390)/169));
            } else if (s < 655 ) {
                p.fill(p.lerpColor(p.color(255, 0, 0), p.color(255, 100, 0), (s-559)/96));
            } else {
                p.fill(255, 255, 255);
            }



            let tempT = (t - s*stepTime)%(totalTime*2);

            let orginX = relOrX; //p.windowWidth/2;
            let orginY = relOrY; //p.windowHeight/2;

            rot = 0;
            wave = (t*6.66)%20;

            let endX = data[s][0]*Math.cos(data[s][1] + rot)*scalar;
            let endY = data[s][0]*Math.sin(data[s][1] + rot)*scalar;

            let x = endX + orginX //(tempT%travelTime)/travelTime*(endX) + orginX;
            let y = endY + orginY//(tempT%travelTime)/travelTime*(endY) + orginY;

            // if(tempT >= travelTime) {
            //     x = orginX + endX;
            //     y = orginY + endY;
            // }

            // if(tempT >= totalTime) {
            //     x = (1 - (tempT%travelTime)/travelTime)*(endX) + orginX;
            //     y = (1 - (tempT%travelTime)/travelTime)*(endY) + orginY;
            // }

            // if(tempT >= totalTime + travelTime) {
            //     x = orginX;
            //     y = orginY;
            // }
                // each particle moves in a circle
                const myX = x + 10*Math.cos(Math.PI * tempT*2);
                const myY = y + 10*Math.sin(Math.PI * tempT*2);

                p.ellipse(myX, myY , 5*(1+scalar)); // draw particle
        }
    t = t + 0.01; // update time


    };
  };