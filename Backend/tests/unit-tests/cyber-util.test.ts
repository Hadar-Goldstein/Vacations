import { expect } from 'chai';
import { cyber } from '../../src/2-utils/cyber';
import { RoleModel } from '../../src/3-models/role-model';
import { UserModel } from '../../src/3-models/user-model';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Cyber', function () {
  this.timeout(20000); 

  let mongoServer: MongoMemoryServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const adminUser = new UserModel({
    firstName: "Alice",
    lastName: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: RoleModel.Admin
  });

  const regularUser = new UserModel({
    firstName: "Bob",
    lastName: "User",
    email: "bob@example.com",
    password: "user123",
    role: RoleModel.User
  });

  describe('getNewToken', () => {
    it('should return a valid JWT token', () => {
      const token = cyber.getNewToken(adminUser);
      expect(token).to.be.a('string');
      expect(token.split('.')).to.have.lengthOf(3);
    });

    it('should not include password in the token payload', () => {
      const token = cyber.getNewToken(adminUser);
      const payload = token.split('.')[1];
      const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
      expect(decoded.user.password).to.be.undefined;
    });
  });

  describe('validateToken', () => {
    it('should return true for a valid token', () => {
      const token = cyber.getNewToken(regularUser);
      const result = cyber.validateToken(token);
      expect(result).to.be.true;
    });

    it('should return false for an invalid token', () => {
      const result = cyber.validateToken("invalid.token.string");
      expect(result).to.be.false;
    });

    it('should return false for an empty token', () => {
      const result = cyber.validateToken("");
      expect(result).to.be.false;
    });
  });

  describe('validateAdmin', () => {
    it('should return true if user is admin', () => {
      const token = cyber.getNewToken(adminUser);
      const result = cyber.validateAdmin(token);
      expect(result).to.be.true;
    });

    it('should return false if user is not admin', () => {
      const token = cyber.getNewToken(regularUser);
      const result = cyber.validateAdmin(token);
      expect(result).to.be.false;
    });
  });

});
