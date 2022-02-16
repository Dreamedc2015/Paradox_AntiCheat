// Import Customs
import * as Minecraft from "mojang-minecraft";
import config from "./data/config.js";
// Import BeforeChat Events
import { BadPackets2 } from "./penrose/beforechatevent/spammer/badpackets_2.js";
import { SpammerA } from "./penrose/beforechatevent/spammer/spammer_a.js";
import { SpammerB } from "./penrose/beforechatevent/spammer/spammer_b.js";
import { SpammerC } from "./penrose/beforechatevent/spammer/spammer_c.js";
import { SpammerD } from "./penrose/beforechatevent/spammer/spammer_d.js";
import { PrefixCommand } from "./penrose/beforechatevent/chat/prefixcommand.js";
import { ChatFilter } from "./penrose/beforechatevent/chat/chatfilter.js";
// Import Tick Events
import { GlobalBanList } from "./penrose/tickevent/ban/globalbanlist.js";
import { ServerBan } from "./penrose/tickevent/ban/serverban.js";
import { CrasherA } from "./penrose/tickevent/crasher/crasher_a.js";
import { NamespoofA } from "./penrose/tickevent/namespoof/namespoof_a.js";
import { NamespoofB } from "./penrose/tickevent/namespoof/namespoof_b.js";
import { PlayerPosition } from "./penrose/tickevent/coordinates/playerposition.js";
import { BedrockValidate } from "./penrose/tickevent/bedrock/bedrockvalidate.js";
import { ReachA } from "./penrose/tickevent/reach/reach_a.js";
import { JesusB } from "./penrose/tickevent/jesus/jesus_b.js";
import { NoSlowA } from "./penrose/tickevent/noslow/noslow_a.js";
import { IllegalItemsA } from "./penrose/tickevent/illegalitems/illegalitems_a.js";
import { InvalidSprintA } from "./penrose/tickevent/invalidsprint/invalidsprint_a.js";
import { FlyA } from "./penrose/tickevent/fly/fly_a.js";
import { FlyB } from "./penrose/tickevent/fly/fly_b.js";
import { AntiKnockbackA } from "./penrose/tickevent/knockback/antikb_a.js";
// Import BlockBreak Events
import { XrayA } from "./penrose/blockbreakevent/xray/xray_a.js";
import { NukerA } from "./penrose/blockbreakevent/nuker/nuker_a.js";
// Import JoinPlayer Events
import { GametestCheck } from "./penrose/playerjoinevent/gametestloaded/gametestcheck.js";
// Import BlockPlace Events
import { ScaffoldA } from "./penrose/blockplaceevent/scaffold/scaffold_a.js";
import { PlaceflagsA } from "./penrose/blockplaceevent/placeflags/placeflags_a.js";

// Self explanatory
const World = Minecraft.world;

// Event Callbacks
const playerJoinEventCallback = World.events.playerJoin;
const blockPlaceCallback = World.events.blockPlace;
const blockBreakCallback = World.events.blockBreak;
const tickEventCallback = World.events.tick;


// BeforeChat Events
if (config.modules.badpackets2.enabled) {
    BadPackets2();
}

if (config.modules.spammerA.enabled) {
    SpammerA();
}

if (config.modules.spammerB.enabled) {
    SpammerB();
}

if (config.modules.spammerC.enabled) {
    SpammerC();
}

if (config.modules.spammerD.enabled) {
    SpammerD();
}

PrefixCommand();
if (config.modules.chatFilter.enabled) {
    ChatFilter();
}
// Tick Events
GlobalBanList();
ServerBan();
PlayerPosition();

if (config.modules.crasherA.enabled) {
    CrasherA();
}

if (config.modules.namespoofA.enabled) {
    NamespoofA();
}

if (config.modules.namespoofB.enabled) {
    NamespoofB();
}

if (config.modules.bedrockValidate.enabled) {
    BedrockValidate();
}

if (config.modules.reachA.enabled) {
    ReachA();
}

if (config.modules.jesusB.enabled) {
    JesusB();
}

if (config.modules.noslowA.enabled) {
    NoSlowA();
}

if (config.modules.illegalitemsA.enabled) {
    IllegalItemsA();
}

if (config.modules.invalidsprintA.enabled) {
    InvalidSprintA();
}

if (config.modules.flyA.enabled) {
    FlyA();
}

if (config.modules.flyB.enabled) {
    tickEventCallback.subscribe(FlyB);
}

if  (config.modules.antikbA.enabled) {
    AntiKnockbackA();
}

// BlockBreak Events
if  (config.modules.xrayA.enabled) {
    XrayA();
}

if  (config.modules.antinukerA.enabled) {
    blockBreakCallback.subscribe(NukerA);
}

// JoinPlayer Events
playerJoinEventCallback.subscribe(GametestCheck);

// BlockPlace Events
if  (config.modules.antiscaffoldA.enabled) {
    blockPlaceCallback.subscribe(ScaffoldA);
}

if  (config.modules.anticbeC.enabled) {
    PlaceflagsA();
}