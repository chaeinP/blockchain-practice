"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = __importStar(require("crypto-js"));
//npm install @types/crypto-js --save-dev , npm install crypto-js를 모두 해줘야 한다
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);
var blockchain = [genesisBlock];
var getBlockchain = function () { return blockchain; };
var getLatestBlock = function () { return blockchain[blockchain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("secondBlock");
createNewBlock("thirdBlock");
createNewBlock("fourthBlock");
console.log(blockchain);
//# sourceMappingURL=index.js.map