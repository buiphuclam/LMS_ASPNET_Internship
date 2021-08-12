using Dapper;
using LMS_G03.Authentication;
using LMS_G03.Common;
using LMS_G03.IServices;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LMS_G03.Services
{
    public class LoginInfoService : ILoginInfoService
    {
        RegisterModel _oRegisterModel = new RegisterModel();
        public async Task<string> ConfirmMail(string username)
        {
            try
            {
                if (string.IsNullOrEmpty(username)) return "Invalid username!";

                RegisterModel oRegisterModel = new RegisterModel()
                {
                    Username = username
                };

                RegisterModel registerModel = await this.CheckRecordExistence(oRegisterModel);
                if(registerModel == null)
                {
                    return Message.InvalidUser;
                }
                else
                {
                    using(IDbConnection con = new SqlConnection(Global.ConnectionString))
                    {
                        if (con.State == ConnectionState.Closed) con.Open();

                        var oRegisterModels = await con.QueryAsync<RegisterModel>("SP_LoginInfo"
                            , this.SetParameters(oRegisterModel, (int)OperationType.UpdateConfirmMail)
                            , commandType: CommandType.StoredProcedure);

                        if (oRegisterModels != null && oRegisterModels.Count() > 0)
                        {
                            _oRegisterModel = oRegisterModels.FirstOrDefault();
                        }
                        return "Mail Confirmed!";
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<RegisterModel> SignUp(RegisterModel oRegisterModel)
        {
            _oRegisterModel = new RegisterModel();
            try
            {
                RegisterModel registerModel = await this.CheckRecordExistence(oRegisterModel);
                if(registerModel == null)
                {
                    using (IDbConnection con = new SqlConnection(Global.ConnectionString))
                    {
                        if (con.State == ConnectionState.Closed) con.Open();

                        var oRegisterModels = await con.QueryAsync<RegisterModel>("SP_LoginInfo"
                            , this.SetParameters(oRegisterModel, (int)OperationType.Signup)
                            , commandType: CommandType.StoredProcedure);

                        if(oRegisterModels != null && oRegisterModels.Count() > 0)
                        {
                            _oRegisterModel = oRegisterModels.FirstOrDefault();
                        }
                        _oRegisterModel.Message = Message.Success;
                    }
                }
                else
                {
                    _oRegisterModel = registerModel;
                }

            }
            catch (Exception ex)
            {
                _oRegisterModel.Message = ex.Message;
            }
            return _oRegisterModel;
        }

        private async Task<RegisterModel> CheckRecordExistence(RegisterModel oRegisterModel)
        {
            RegisterModel registerModel = new RegisterModel();
            if (!string.IsNullOrEmpty(oRegisterModel.Username))
            {
                registerModel = await this.GetLoginUser(oRegisterModel.Username);
                if(registerModel != null)
                {
                    if (!registerModel.IsMailConfirmed)
                    {
                        registerModel.Message = Message.VerifyMail;
                    }
                    else if (registerModel.IsMailConfirmed)
                    {
                        registerModel.Message = Message.UserAlreadyCreated;
                    }
                }
            }
            return registerModel;
        }

        public async Task<RegisterModel> GetLoginUser(string username)
        {
            _oRegisterModel = new RegisterModel();
            using (IDbConnection con = new SqlConnection(Global.ConnectionString))
            {
                if (con.State == ConnectionState.Closed) con.Open();

                string sql = "SELECT * FROM AspNetUsers Where 1=1";

                if (!string.IsNullOrEmpty(username)) sql += " AND UserName='" + username + "'";
                var oRegisterModels = (await con.QueryAsync<RegisterModel>(sql)).ToList();
                if (oRegisterModels != null && oRegisterModels.Count > 0)
                    _oRegisterModel = oRegisterModels.SingleOrDefault();
                else return null;

            }
            return _oRegisterModel;
        }
        private DynamicParameters SetParameters(RegisterModel oRegisterModel, int nOperationtype)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@UserName", oRegisterModel.Username);
            parameters.Add("@Email", oRegisterModel.Email);
            parameters.Add("@Password", oRegisterModel.Password);
            parameters.Add("@IsMailConfirmed", oRegisterModel.IsMailConfirmed);
            parameters.Add("@OperationType", nOperationtype);
            return parameters;
        }
    }
}
